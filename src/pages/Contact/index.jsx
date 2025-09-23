import { useState } from 'react';

import { LoadingOutlined } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, Select, notification, Spin } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import axios from '../../common/axios_call';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import WhatsappImage from '../../assets/images/icons/whatsapp.png';
const Contact = () => {
    const antIcon = (
        <LoadingOutlined
            style={{ fontSize: 24, color: '#fff', marginLeft: 20 }}
            spin
        />
    );

    const [loadMessageButton, setLoadMessageButton] = useState(false);

    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: '',
            placement: 'bottomRight',
            description: message,
        });
    };

    const joinUsVerification = yup.object().shape({
        firstName: yup
            .string()
            .required('Please enter your first name')
            .min(2, 'First name can not be less than 2 characters'),
        lastName: yup
            .string()
            .required('Please enter your last name')
            .min(2, 'Last name can not be less than 2 characters'),
        emailAddress: yup
            .string()
            .email()
            .required('Please enter your email address')
            .min(5, 'Email address can not be less than 5 characters'),
        phoneNumber: yup
            .string()
            .required('Please enter your phone number')
            .min(11, 'Phone number can not be less than 11 characters'),
        helpType: yup.string().required('Please select how we can help you'),
    });

    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(joinUsVerification),
    });

    const handleContact = (e) => {
        setLoadMessageButton(true);
        let { firstName, lastName, emailAddress, phoneNumber, message } = e;
        let joinUsMssg = {
            first_name: firstName,
            last_name: lastName,
            email: emailAddress,
            phone_number: phoneNumber,
            help_type: e.helpType,
            interrest: '',
            message,
        };
        axios
            .post('/feed-back/contactus', joinUsMssg)
            .then((res) => {
                setLoadMessageButton(false);
                if (res.data.statusMessage === 'success') {
                    setValue('firstName', '');
                    setValue('lastName', '');
                    setValue('emailAddress', '');
                    setValue('phoneNumber', '');
                    setValue('message', '');
                    openNotificationWithIcon('success', res.data.message);
                } else {
                    openNotificationWithIcon('error', res.data.message);
                }
            })
            .catch((err) => {
                setLoadMessageButton(false);
                openNotificationWithIcon('error', err.response.data.message);
            });
    };
    return (
        <div>
            <Navbar />
            <div className="flex flex-col lg:flex-row justify-between items-center px-4 lg:px-20 py-10 lg:py-20 gap-10 lg:gap-0 contact">
                <div className="flex-1">
                    <div>
                        <h3 className='text-xl leading-loose md:text-4xl font-bold text-white'>
                            Need help today? <br /> Fill the form or <br /> Chat with
                            us.
                        </h3>
                        <div className="contact_page_list mt-4 space-y-6">
                            <div>
                                <p className='text-white'>
                                    <b>Support team</b>
                                </p>
                                <p className='text-white'>Consukon Limited</p>
                            </div>
                            <div>
                                <p className='text-white'>
                                    <strong>Address:</strong> <br />
                                    157 Ipaja Road, Baruwa, <br />
                                    Ipaja, Lagos
                                </p>
                            </div>
                            <div>
                                <a
                                    target="_blank"
                                    href="tel:+2348073376943"
                                    rel="noreferrer" className='text-white'
                                >
                                    <strong>Telephone:</strong> <br /> +234 807 3376 943
                                </a>
                            </div>
                            <div>
                                <a
                                    target="_blank"
                                    href="https://wa.me/message/BQ6R24FMTML7F1"
                                    rel="noreferrer"
                                >
                                    <img
                                        style={{ height: '3.5rem' }}
                                        src={WhatsappImage}
                                        alt="WhatsApp Chat Icon"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:max-w-[500px]">
                    <div className="bg-white p-8 rounded-2xl shadow-lg">
                        <form autoComplete="off" className='space-y-3' onSubmit={handleSubmit(handleContact)}>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div className="space">
                                    <label className='text-sm' htmlFor="firstName">First name</label>
                                    <Controller
                                        name="firstName"
                                        defaultValue=""
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                id="firstName"
                                                type="text"
                                                style={{ height: '3.5rem' }}
                                            />
                                        )}
                                    />
                                    {errors.firstName && (
                                        <p className="">
                                            {errors.firstName.message}
                                        </p>
                                    )}
                                </div>
                                <div className="">
                                    <label className='text-sm' htmlFor="lastName">Last name</label>
                                    <Controller
                                        name="lastName"
                                        defaultValue={''}
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                id="lastName"
                                                type="text"
                                                style={{ height: '3.5rem' }}
                                            />
                                        )}
                                    />
                                    {errors.lastName && (
                                        <p className="">
                                            {errors.lastName.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div className="">
                                    <label className='text-sm' htmlFor="emailAddress">Email address</label>
                                    <Controller
                                        name="emailAddress"
                                        defaultValue={''}
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                type="email"
                                                id="emailAddress"
                                                {...field}
                                                style={{ height: '3.5rem' }}
                                            />
                                        )}
                                    />
                                    {errors.emailAddress && (
                                        <p className="">
                                            {errors.emailAddress.message}
                                        </p>
                                    )}
                                </div>
                                <div className="">
                                    <label className='text-sm' htmlFor="phoneNumber">Phone number</label>
                                    <Controller
                                        name="phoneNumber"
                                        defaultValue={''}
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                type="tel"
                                                id="phoneNumber"
                                                {...field}
                                                style={{ height: '3.5rem' }}
                                            />
                                        )}
                                    />
                                    {errors.phoneNumber && (
                                        <p className="">
                                            {errors.phoneNumber.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="">
                                <label className='text-sm' htmlFor="helpType">How can we help?</label>
                                <Controller
                                    name="helpType"
                                    control={control}
                                    defaultValue={undefined}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            id="helpType"
                                            style={{ width: '100%', height: '5rem' }}
                                            placeholder="Select an option"
                                        >
                                            <Select.Option value="I want to become a restaurant">
                                                I want to become a restaurant
                                            </Select.Option>
                                            <Select.Option value="I want to cancel my account">
                                                I want to cancel my account
                                            </Select.Option>
                                            <Select.Option value="I want to talk to a support manager">
                                                I want to talk to a support manager
                                            </Select.Option>
                                            <Select.Option value="I want to join the delivery team">
                                                I want to join the delivery team
                                            </Select.Option>
                                        </Select>
                                    )}
                                />
                                {errors.helpType && (
                                    <p className="">{errors.helpType.message}</p>
                                )}
                            </div>
                            <div className="">
                                <label className='text-sm' htmlFor="message">Message</label>
                                <Controller
                                    name="message"
                                    defaultValue=""
                                    control={control}
                                    render={({ field }) => (
                                        <Input.TextArea rows={4} {...field} id="message" />
                                    )}
                                />
                                {errors.message && (
                                    <p className="">{errors.message.message}</p>
                                )}
                            </div>
                            <div style={{ marginTop: '5%' }}></div>
                            <div className="">
                                {!loadMessageButton ? (
                                    <button
                                        style={{
                                            display: 'block',
                                            width: '100%',
                                            height: '4rem',
                                        }}
                                        className="bg-primary text-white rounded-2xl text-sm"
                                    >
                                        Send message
                                    </button>
                                ) : (
                                    <button
                                        disabled
                                        style={{
                                            display: 'block',
                                            width: '100%',
                                            height: '4rem',
                                        }}
                                        className="bg-primary text-white rounded-2xl text-sm"
                                    >
                                        Sending message. Please wait.
                                        <Spin indicator={antIcon} />
                                    </button>
                                )}
                            </div>
                            <div style={{ clear: 'both' }}></div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer noSpace={true} />
        </div>
    );
};

export default Contact;
