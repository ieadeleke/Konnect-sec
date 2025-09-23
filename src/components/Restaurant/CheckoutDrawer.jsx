import { useState } from 'react';
import { Col, Drawer, Form, Input, Row, Select, notification } from 'antd';
import map_locationIcon from '../../assets/images/restaurant/map_locationIcon.svg';
import { _add_delivery_address } from '../../common/axios_services';
import RightDrawerTemplate from '../RightDrawerTemplate';

export const CheckoutDrawer = ({ visible, onClose, title, restaurantData }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
  };


  const handleSubmit = async (values) => {
    setLoading(true);

    const payload = {
      name: values.name,
      phone_code: '+234', 
      phone_contact: values.phone_contact,
      email: values.email,
      address: values.address,
      landmark: values.landmark || '',
      state: restaurantData.state,
      city: restaurantData.city,
      lga: restaurantData.lga,
      latitude: restaurantData.longitude,
      longitude: restaurantData.latitude,
      is_default: true,
    };

    try {
      await _add_delivery_address(payload);
      openNotificationWithIcon('success', 'Address added successfully!');
      form.resetFields();
      onClose();
      window.location.reload(); 
    } catch (error) {
      openNotificationWithIcon(
        'error',
        error.response?.data?.message || 'Failed to add address'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <RightDrawerTemplate
      closeDrawer={onClose}
      openDrawer={visible}
      width={720}
      title={`${title}  delivery address`}
    >
      <Row justify={'center'} className="mt-10">
        <Col xs={24}>
          <Form form={form} layout="vertical" onFinish={handleSubmit}>

            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please enter your name' }]}
            >
              <Input className="py-4 px-3" placeholder="Name" />
            </Form.Item>

            <Form.Item
              name="phone_contact"
              label="Phone number"
              rules={[
                { required: true, message: 'Please enter your phone number' },
              ]}
            >
              <Input className="py-4 px-3" placeholder="Phone Number" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { type: 'email', message: 'Please enter a valid email' },
                { required: true, message: 'Please enter your email' },
              ]}
            >
              <Input className="py-4 px-3" placeholder="Email Address" />
            </Form.Item>

            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: 'Please enter your address' }]}
            >
              <Input
                className="py-4 px-3"
                placeholder="Address"
                suffix={
                  <img
                    src={map_locationIcon}
                    className="w-10 h-10"
                    alt="location icon"
                  />
                }
              />
            </Form.Item>

            <div className="my-3 flex justify-end">
              <Form.Item>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#44843F] text-white rounded-3xl border-2 border-black px-40 my-10 py-3"
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
              </Form.Item>
            </div>
          </Form>
        </Col>
      </Row>
    </RightDrawerTemplate>
  );
};
