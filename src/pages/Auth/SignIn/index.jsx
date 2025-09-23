import { ArrowRightOutlined, LoadingOutlined } from '@ant-design/icons';
import { Input, notification, Spin } from 'antd';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../slices/authSlice';
import Footer from '../../../components/Footer';
import Navbar from '../../../components/Navbar';

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const params = new URLSearchParams(window?.location?.search);
  const redirectUrl = params.get('konnectrd') || '';
  const redir = params.get('redir') || '';
  const referralCode = params.get('konnectrfc') || '';

  const [useAccountID, setUseAccountID] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#fff' }} spin />;

  const { handleSubmit, control } = useForm({
    defaultValues: {
      accountID: '',
      loginPin: '',
      emailAddress: '',
      password: '',
    },
  });

  const openNotification = (type, title, message) => {
    notification[type]({
      message: title,
      description: message,
      placement: 'bottom-right',
    });
  };

  const buildSignInData = (formData) =>
    useAccountID
      ? {
          email: formData.accountID,
          password: formData.loginPin,
          app: 'web',
          device_id: '',
          device_type: '',
          role_id: 1,
        }
      : {
          email: formData.emailAddress,
          password: formData.password,
          app: 'web',
          device_id: '',
          device_type: '',
          role_id: 1,
        };

  const handleNavigation = (result) => {
    if (redir) {
      navigate(`/${redir}`);
    } else if (
      result?.user?.is_restaurant ||
      result?.user?.is_vendor ||
      result?.user?.is_so
    ) {
      navigate('/restaurant/dashboard');
    } else {
      navigate('/home');
    }
  };

  const submitMe = async (formData) => {
    setErrorMessage('');

    try {
      const signInData = buildSignInData(formData);
      const result = await dispatch(loginUser(signInData)).unwrap();

      openNotification('success', 'Login Successful', 'You have successfully logged in');
      handleNavigation(result);
    } catch (err) {
      console.error('Signin error:', err);

      const message =
        typeof err === 'string'
          ? err
          : 'An unexpected error occurred while signing in. Please try again.';

      if (typeof err === 'string' && err.includes('not been verified')) {
        navigate('/verify-email');
      } else {
        setErrorMessage(message);
        openNotification('error', 'Authentication Error', message);
      }
    }
  };

  const renderAuthFields = (formControl) =>
    useAccountID ? (
      <>
        <div className="mb-4">
          <label htmlFor="accountID" className="block text-sm">
            Account ID
          </label>
          <Controller
            name="accountID"
            control={formControl}
            render={({ field }) => (
              <Input {...field} type="text" className="h-16 md:h-14 w-full" />
            )}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="loginPin" className="block text-sm">
            Login Pin
          </label>
          <Controller
            name="loginPin"
            control={formControl}
            render={({ field }) => (
              <Input.Password
                {...field}
                inputMode="numeric"
                className="h-16 md:h-14 w-full"
              />
            )}
          />
        </div>
      </>
    ) : (
      <>
        <div className="mb-4">
          <label htmlFor="emailAddress" className="block text-sm">
            Email Address
          </label>
          <Controller
            name="emailAddress"
            control={formControl}
            render={({ field }) => (
              <Input {...field} type="email" className="h-16 md:h-14 w-full" />
            )}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm">
            Password
          </label>
          <Controller
            name="password"
            control={formControl}
            render={({ field }) => (
              <Input.Password
                {...field}
                type="password"
                className="h-16 md:h-14 w-full"
              />
            )}
          />
        </div>
      </>
    );

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 justify-center items-center py-10">
        <div className="bg-white shadow-md w-full max-w-lg px-4 md:px-6 py-5 md:py-8">
          <h3 className="text-lg md:text-xl font-bold mb-1">
            Login to your Konnect account!
          </h3>
          <p className="text-sm md:text-base text-gray-600 mb-6 leading-loose">
            Think Food, think Konnect. Family & friends eat cheaper. Refer
            friends and earn monthly.
          </p>
          {errorMessage && (
            <p className="text-red-600 text-sm mb-4">{errorMessage}</p>
          )}

          <form onSubmit={handleSubmit(submitMe)}>
            <div className="flex justify-between items-center mb-6">
              <button
                type="button"
                onClick={() => setUseAccountID(!useAccountID)}
                className="bg-green-700 text-white text-sm font-semibold py-2 px-5 rounded-xl hover:bg-green-800 transition"
              >
                {useAccountID
                  ? 'Sign in using Email Address'
                  : 'Sign in with Account ID'}
                <ArrowRightOutlined className="ml-1" />
              </button>
            </div>

            {renderAuthFields(control)}

            <div className="mt-4 space-y-2">
              <Link
                to={`/signup/?konnectrfc=${referralCode}&konnectrd=${redirectUrl}`}
                className="block text-blue-600 hover:underline text-sm"
              >
                New customer? <span>Create your account</span>
              </Link>
              <Link
                to={`/resetsendmail`}
                className="block text-blue-600 hover:underline text-sm"
              >
                {useAccountID ? 'Forgot Pin?' : 'Lost Password?'}{' '}
                <span>{useAccountID ? 'Recover pin' : 'Recover password'}</span>
              </Link>
            </div>

            <button
              disabled={loading}
              className="bg-green-700 text-white w-full mt-8 h-14 rounded hover:bg-green-800 transition flex items-center justify-center"
            >
              {loading ? <Spin indicator={antIcon} /> : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signin;
