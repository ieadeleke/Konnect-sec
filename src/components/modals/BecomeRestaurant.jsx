import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import { ArrowDownOutlined } from '@ant-design/icons';

const BecomeRestaurant = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#FDF4D7] py-10 px-10 md:px-28 w-full">
      <span>
        <Link to={`/`}>
          <img
            src={Logo}
            className="w-[70%] md:h-1/5 md:w-1/5"
            alt="konnect logo"
          />
        </Link>
      </span>
      <p className="my-4 mt-5 font-bold text-5xl">
        Welcome to Konnect restaurant
      </p>
      <p className="my-4">This platform is powered by Consukon Limited.</p>
      <p className="my-4">
        We will assign you a dedicated support manager to support your
        experience on this platform.{' '}
      </p>
      <p className="my-4">
        We will handle the marketing and help you to achieve projected weekly
        sales of NGN 1.5 million.{' '}
      </p>
      <p className="my-4">
        You can earn delivery fees if interested. Simply click on My delivery
        and add your delivery personnel.{' '}
      </p>
      <p className="my-4 font-bold">Note the following</p>
      <ol className="my-4 list-decimal pl-5 space-y-2 text-lg">
        <li className="ml-4">
          You're paid instantly into your wallet account and can be transferred
          to any bank.
        </li>
        <li className="ml-4">
          We don't charge restaurants but selling price must include cost of
          packaging
        </li>
      </ol>
      <p>
        To start click profile button below{' '}
        <ArrowDownOutlined style={{ color: '#258635' }} />{' '}
      </p>
      <div className="my-10">
        <button
          className="rounded-full bg-transparent py-3 px-24 border-2 border-black text-black text-2xl hover:bg-[#258635] hover:text-white hover:border-[#258635] transition-colors"
          onClick={() => navigate('/restaurant/profile')}
        >
          Profile
        </button>
      </div>
    </div>
  );
};

export default BecomeRestaurant;
