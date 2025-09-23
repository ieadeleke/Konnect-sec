













































































































import { Button, Form, Input, Modal, Spin, notification } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


import { _get_user_by_account_id, _post_restaurant_drivers_by_account_id } from '../../common/axios_services';
const schema = yup.object().shape({
  bikerId: yup.string().required('Biker ID is required'),
  firstname: yup.string().required('First name is required'),
  lastname: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  telephone: yup
    .string()
    .matches(/^\d+$/, 'Only numbers are allowed')
    .min(10, 'Telephone must be at least 10 digits')
    .required('Telephone is required'),
});

const DeliveryPersonModal = ({ onComplete }) => {
  const navigate = useNavigate();
  const [deliveryPerson, setDeliveryPerson] = useState(false);
  const [bikerIdInput, setBikerIdInput] = useState('');
  const [isFetchingBiker, setIsFetchingBiker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const openNotificationWithIcon = (type, title, message) => {
    notification[type]({
      message: title ? title : '',
      description: message ? message : '',
      placement: 'bottom-right',
    });
  };

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      bikerId: '',
      firstname: '',
      lastname: '',
      email: '',
      telephone: '',
    },
  });

  const onSubmit = async (data) => {
    if (!data.bikerId || !data.firstname || !data.lastname) {
      openNotificationWithIcon(
        'error',
        'Validation Error',
        'Please enter a valid Biker ID and ensure details are loaded.'
      );
      return;
    }

    setIsSubmitting(true); 
    try {

      const resp = await _post_restaurant_drivers_by_account_id(data.bikerId);
      const responseData = resp?.data;

      if (responseData.status === 'success') {
        openNotificationWithIcon(
          'success',
          'Success',
          responseData.message || 'Biker assigned to restaurant successfully!'
        );
        if (onComplete) {
          onComplete();
        }
        handleModalClose(); 
      } else {
        openNotificationWithIcon(
          'error',
          'Error',
          responseData.message || 'Failed to assign biker to restaurant.'
        );
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'An error occurred during biker assignment.';
      openNotificationWithIcon('error', 'Error', errorMessage);


      if (
        (err.message &&
          err.message.includes('Authorization token not found')) ||
        err.response?.status === 401
      ) {
        navigate('/signin');
      }
    } finally {
      setIsSubmitting(false); 
    }
  };


  useEffect(() => {
    const handler = setTimeout(() => {
      if (bikerIdInput) {
        fetchBikerDetails(bikerIdInput);
      } else {
        setValue('firstname', '');
        setValue('lastname', '');
        setValue('email', '');
        setValue('telephone', '');
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [bikerIdInput]);

  const fetchBikerDetails = async (id) => {
    if (id.length !== 8) return;
    setIsFetchingBiker(true);
    try {
      const resp = await _get_user_by_account_id(id);
      const responseData = resp?.data;
      const userData = responseData?.data;
      console.log(userData);
      if (userData) {
        const { first_name, last_name, email, phone_number } =
          responseData.data;
        setValue('firstname', first_name);
        setValue('lastname', last_name);
        setValue('email', email);
        setValue('telephone', phone_number);
        openNotificationWithIcon('success', 'Success', 'Biker details loaded.');
      } else {
        openNotificationWithIcon(
          'error',
          'Error',
          responseData.message || 'Could not fetch biker details.'
        );
        setValue('firstname', '');
        setValue('lastname', '');
        setValue('email', '');
        setValue('telephone', '');
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'An error occurred while fetching biker details.';
      openNotificationWithIcon('error', 'Error', errorMessage);
      setValue('firstname', '');
      setValue('lastname', '');
      setValue('email', '');
      setValue('telephone', '');
      if (
        (err.message &&
          err.message.includes('Authorization token not found')) ||
        err.response?.status === 401
      ) {
        navigate('/signin');
      }
    } finally {
      setIsFetchingBiker(false);
    }
  };

  const handleModalClose = () => {
    setDeliveryPerson(false);
    setBikerIdInput('');
    reset();
  };

  return (
    <>
      <button
        onClick={() => {
          setDeliveryPerson(!deliveryPerson);
        }}
        className=""
        style={{ width: 'fit-content ' }}
      >
        Delivery Person
      </button>
      <Modal
        centered={true}
        title=""
        open={deliveryPerson}
        footer={null}
        className="pb-5 pt-5"
        onCancel={handleModalClose}
      >
        <div style={{ height: '400px', overflowY: 'auto' }}>
          <h2 style={{ fontSize: '2.5rem' }} className="mb-3">
            Biker Account ID
          </h2>
          <Form
            layout="vertical"
            onFinish={handleSubmit(onSubmit)}
            style={{ maxWidth: 500, margin: 'auto' }}
          >
            <Form.Item
              label="Biker ID"
              validateStatus={errors.bikerId ? 'error' : ''}
              help={errors.bikerId?.message}
            >
              <Controller
                name="bikerId"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter Biker ID"
                    onChange={(e) => {
                      field.onChange(e); 
                      setBikerIdInput(e.target.value); 
                    }}
                    suffix={isFetchingBiker ? <Spin size="small" /> : null}
                  />
                )}
              />
            </Form.Item>

            <Form.Item
              label="First Name"
              validateStatus={errors.firstname ? 'error' : ''}
              help={errors.firstname?.message}
            >
              <Controller
                name="firstname"
                disabled
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Enter first name" readOnly />
                )}
              />
            </Form.Item>

            <Form.Item
              label="Last Name"
              disabled
              validateStatus={errors.lastname ? 'error' : ''}
              help={errors.lastname?.message}
            >
              <Controller
                name="lastname"
                disabled
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Enter last name" readOnly />
                )}
              />
            </Form.Item>

            <Form.Item
              label="Email"
              disabled
              validateStatus={errors.email ? 'error' : ''}
              help={errors.email?.message}
            >
              <Controller
                name="email"
                disabled
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Enter email" readOnly />
                )}
              />
            </Form.Item>

            <Form.Item
              label="Telephone"
              disabled
              validateStatus={errors.telephone ? 'error' : ''}
              help={errors.telephone?.message}
            >
              <Controller
                name="telephone"
                disabled
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter telephone number"
                    readOnly
                  />
                )}
              />
            </Form.Item>

            <Form.Item>
              <div className="flex justify-between mt-3 pt-3">
                <Button type="primary" htmlType="submit" loading={isSubmitting}>
                  {' '}

                  Submit
                </Button>
                <Button onClick={handleModalClose}>Cancel</Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};
export default DeliveryPersonModal;
