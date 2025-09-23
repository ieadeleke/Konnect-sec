

import { Button, Form, Input, Modal, Radio, Result, Select, Spin, notification } from 'antd';
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { _bank_verification, _calc_commission, _get_all_banks, _get_beneficiaries, _get_profile, _get_user_account_history, _get_wallet_lookup_by_account_id, _payout, _payout_internal, _verify_pin } from '../../common/axios_services';
import { updateCount } from '../../slices/updateCountSlice';

export default function TransferModal({ onComplete }) {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const params = new URLSearchParams(window?.location?.search);
  const [tx_ref] = useState(params.get('tx_ref') ? params.get('tx_ref') : '');
  const [status] = useState(params.get('status') ? params.get('status') : '');
  const [transaction_id] = useState(
    params.get('transaction_id') ? params.get('transaction_id') : ''
  );
  const [showTransaction, setShowTransaction] = useState(false);
  const [err_status, setErr_status] = useState(false);
  const [message, setMessage] = useState(false);

  const [wallet_bal, setWallet_bal] = useState(0);
  const [voucher_bal, setVoucher_bal] = useState(0);
  const [wise9ja_bal, setWise9ja_bal] = useState(0);
  const [payOut, setPayout] = useState(false);
  const [fundOptions, setFundOptions] = useState('wallet');
  const [allBanks, setAllBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState();
  const [accNo, setAccNo] = useState(0);
  const [benDetails, setBenDetails] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [payingBank, setPayingBank] = useState(false);
  const [payingWallet, setPayingWallet] = useState(false);
  const [loadingBankDetails, setLoadingBankDetails] = useState(false);
  const [accountName, setAccountName] = useState('');
  const [loadingCommission, setLoadingCommission] = useState(false);
  const [normalCommission, setNormalCommission] = useState(0);
  const [totalCommission, setTotalCommission] = useState(0);
  const [loadingWalletDetails, setLoadingWalletDetails] = useState(false);
  const [profileData, setProfileData] = useState(false);
  const [verifiedPin, setVerifiedPin] = useState(false);
  const [revealPinMessage, setRevealPinMessage] = useState(false);
  const [verifingPin, setVerifingPin] = useState(false);
  const [transferType, setTransferType] = useState('bank');
  const [transferInfo, setTransferInfo] = useState({});
  const [userBen, setUserBen] = useState([]);
  const [konnectTransferModal, setKonnectTransferModal] = useState(false);
  const [transferTo, setTransferTo] = useState('');
  const dispatch = useDispatch();
  const updateCounts = useSelector((state) => state.updateCount.count);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);
  const [loadingBen, setLoadingBen] = useState(false);

  const handleBeneficiaryChange = (value) => {
    const selected = userBen.find(
      (beneficiary) => beneficiary.account_number === value
    );
    setSelectedBeneficiary(selected);
    setAccountName(selected?.account_name);
    const selectedBenBank = allBanks.find(
      (bank) => bank.name === selected.bank_name
    );
    setSelectedBank({
      key: selectedBenBank.nipCode,
      label: selectedBenBank.name,
      title: selectedBenBank.nipCode,
      value: selectedBenBank.nipCode,
    });
    setAccNo(selected?.account_number);
    setBenDetails({
      data: {
        bank: {
          id: selectedBenBank.nipCode,
        },
      },
    });
    form.setFieldsValue({
      accNo: selected?.account_number,
      accName: selected?.account_name,
      bank: selectedBenBank
        ? {
            key: selectedBenBank.nipCode,
            label: selectedBenBank.name,
            title: selectedBenBank.nipCode,
            value: selectedBenBank.nipCode,
          }
        : undefined,
    });
  };

  const handleWalletBeneficiaryChange = (value) => {
    const selected = userBen.find(
      (beneficiary) => beneficiary.account_number === value
    );
    setSelectedBeneficiary(selected);
    setBenDetails(selected);
    setAccountName(selected?.account_name);
    setAccNo(selected?.account_number);
    form.setFieldsValue({
      accNo: selected?.account_number,
      accName: selected?.account_name,
    });
  };

  const openNotificationWithIcon = (type, title, message) => {
    notification[type]({
      message: title ? title : '',
      description: message ? message : '',
      placement: 'bottom-right',
    });
  };
  const jwt = localStorage.konnect_token;

  if (!jwt) {
    openNotificationWithIcon('error', 'Something went wrong', 'Unauthorized');
    return navigate('/signin');
  }
  const getBanks = async () => {
    try {
      const get_banks = await _get_all_banks();
      setAllBanks(get_banks.data.data);
    } catch (err) {
      if (err.response) {
        if (err.response.data.message === 'Unauthorized') {
          localStorage.removeItem('konnect_token');
          navigate('/');
        }
        openNotificationWithIcon(
          'error',
          err?.response?.data?.title,
          err?.response?.data?.message
        );
      } else {
        openNotificationWithIcon('error', 'Something went wrong', err?.message);
      }
    }
  };
  const getBeneficiaries = async () => {
    setLoadingBen(true);
    try {
      const type = transferType === 'wallet' ? transferType : '';
      const get_ben = await _get_beneficiaries({ type });
      setUserBen(get_ben?.data?.data);
    } catch (err) {
      setUserBen([]);
      if (err.response) {
        if (err.response.data.message === 'Unauthorized') {
          localStorage.removeItem('konnect_token');
          navigate('/');
        }
        openNotificationWithIcon(
          'error',
          err?.response?.data?.title,
          err?.response?.data?.message
        );
      } else {
        openNotificationWithIcon('error', 'Something went wrong', err?.message);
      }
    } finally {
      setLoadingBen(false);
    }
  };
  const getProfile = async () => {
    try {
      const profile = await _get_profile();
      setProfileData(profile.data.data);
    } catch (err) {
      setProfileData(false);
    }
  };
  const dashboardDetails = async () => {
    try {
      const getDashDetails = await _get_user_account_history();
      setWallet_bal(getDashDetails.data.data.wallet_balance);
      setVoucher_bal(getDashDetails.data.data.wisenija_cash_earned);
      setWise9ja_bal(getDashDetails.data.data.wisenija_sub);
    } catch (err) {
      if (err.response) {
        if (err.response.data.message === 'Unauthorized') {
          localStorage.removeItem('konnect_token');
          navigate('/signin');
        }
        openNotificationWithIcon(
          'error',
          err?.response?.data?.title,
          err?.response?.data?.message
        );
      } else {
        openNotificationWithIcon(
          'error',
          'Something went wrong',
          'An error occurred while loading user-details.'
        );
      }
    }
  };

  useEffect(() => {
    getProfile();
    dashboardDetails();
  }, [tx_ref, status, transaction_id]);
  const Bank = async (accNo, selectedBank) => {
    if (accNo && selectedBank) {
      setLoadingBankDetails(true);
      try {
        const banker = await _bank_verification({
          account_number: `${accNo}`,
          account_bank: `${selectedBank.title}`,
        });
        setLoadingBankDetails(false);
        if (banker.data.status === 'error') {
          setBenDetails(false);
          setErrorMessage(banker.data.message);
          setAccountName('Not Found');
          form.setFieldsValue({
            accName: '',
          });
        } else {
          setErrorMessage(false);
          setBenDetails(banker.data);
          form.setFieldsValue({
            accName: banker.data.data.accountName,
          });
          setAccountName(banker.data.data.accountName);
        }
      } catch (err) {
        setBenDetails(false);
        setAccountName('');
        setLoadingBankDetails(false);
        form.setFieldsValue({
          accName: '',
        });
        if (err.response) {
          if (err.response.data.message === 'Unauthorized') {
            localStorage.removeItem('konnect_token');
            navigate('/');
          }
          setErrorMessage(err.response.data.message);
        } else {
          openNotificationWithIcon(
            'error',
            'Something went wrong',
            err.message
          );
        }
      }
    }
  };
  const UpdateSendToBank = async (values) => {
    if (values.bank) {
      setSelectedBank(values.bank);
      if (accNo) {
        Bank(accNo, values.bank);
      }
    } else if (values.accNo) {
      if (values?.accNo?.length === 10) {
        setAccNo(values.accNo);
        if (selectedBank) {
          Bank(values.accNo, selectedBank);
        }
      } else {
        setBenDetails(false);
        setAccountName('');
        form.setFieldsValue({
          accName: '',
        });
      }
    } else if (values?.amount?.length > 2) {
      setLoadingCommission(true);
      try {
        const commission = await _calc_commission({
          settings_id: '14',
          amount: `${values.amount}`,
          account_number: accNo,
        });
        setLoadingCommission(false);
        setTotalCommission(commission.data.total_amount);
        setNormalCommission(commission.data.charges);
        setErrorMessage(false);
      } catch (err) {
        setLoadingCommission(false);
        if (err?.response) {
          if (err?.responsse?.data?.message === 'Unauthorized') {
            localStorage.removeItem('konnect_token');
            navigate('/');
          } else {
            setErrorMessage(err?.response?.data?.message);
          }
        } else {
          openNotificationWithIcon(
            'error',
            'Something went wrong',
            err.message
          );
        }
      }
    }
  };
  const wallet_validation = async ({ accountNo }) => {
    setLoadingWalletDetails(true);
    try {
      const accOwner = await _get_wallet_lookup_by_account_id(accountNo);
      setLoadingWalletDetails(false);
      setErrorMessage(false);
      console.log(accOwner);
      setBenDetails(accOwner?.data?.data);
      form.setFieldsValue({
        accName: `${accOwner?.data?.data.firstname} ${accOwner?.data?.data.lastname}`,
      });
      setAccountName(accOwner?.data?.data?.account_name);
    } catch (err) {
      setBenDetails(false);
      setAccountName('');
      setLoadingWalletDetails(false);
      form.setFieldsValue({
        accName: '',
      });
      if (err.response) {
        if (err.response.data.message === 'Unauthorized') {
          localStorage.removeItem('konnect_token');
          navigate('/');
        }
        setErrorMessage(err?.response?.data?.message);
      } else {
        openNotificationWithIcon('error', 'Something went wrong', err.message);
      }
    }
  };
  const UpdateSendToWallet = async (values) => {
    if (values.accNo) {
      if (values.accNo.length === 8) {
        wallet_validation({ accountNo: values.accNo });
        setAccNo(values.accNo);
      } else {
        setBenDetails(false);
        setAccountName('');
        form.setFieldsValue({
          accName: '',
        });
      }
    } else if (values?.amount?.length > 2) {
      setLoadingCommission(true);
      try {
        const commission = await _calc_commission({
          settings_id: '15',
          amount: `${values.amount}`,
          account_number: accNo,
        });
        setLoadingCommission(false);
        setTotalCommission(commission.data.total_amount);
        setNormalCommission(commission.data.charges);
        setErrorMessage(false);
      } catch (err) {
        setLoadingCommission(false);
        if (err.response) {
          if (err.response.data.message === 'Unauthorized') {
            localStorage.removeItem('konnect_token');
            navigate('/');
          }
          setErrorMessage(err.response.data.message);
        } else {
          openNotificationWithIcon(
            'error',
            'something went wrong',
            err.message
          );
        }
      }
    }
    if (values.transfer_from) {
      setAccountName('');
      setAccNo('');
      setTransferTo('');
      setBenDetails(false);
      form.setFieldsValue({
        transfer_to: '',
        accNo: '',
      });
    }
    if (values.transfer_to) {
      setAccountName('');
      setAccNo('');
      setBenDetails(false);
      form.setFieldsValue({
        accNo: '',
      });
    }
  };
  useEffect(() => {
    if (
      (fundOptions === 'wallet' && transferTo === 'konnect_balance') ||
      (fundOptions === 'konnect' && transferTo === 'wallet_balance')
    ) {
      form.setFieldsValue({
        accNo: profileData?.ref_code,
      });
      setAccNo(profileData?.ref_code);
      wallet_validation({ accountNo: profileData.ref_code });
    }
  }, [fundOptions, transferTo]);
  const BankTrans = async (values) => {
    setPayingBank(true);
    try {
      const data = {
        beneficiary_id: benDetails?.data?.bank?.id,
        bank_code: selectedBank.title,
        account_number: accNo,
        amount: values.amount,
        charges: `${normalCommission}`,
        currency: 'NGN',
        narration: `${values.narration}`,
      };
      const PayOut = await _payout(data);
      setPayingBank(false);
      setPayingWallet(false);
      form.resetFields();
      setTransferTo('');
      setFundOptions('wallet');
      setBenDetails(false);
      setKonnectTransferModal(false);
      setTransferType('bank');
      setAccountName('');
      setPayout(false);
      setTransferInfo({});
      setNormalCommission(0);

      dispatch(updateCount(updateCounts + 1));
      openNotificationWithIcon(
        'success',
        PayOut?.data?.title,
        PayOut?.data?.message
      );
      if (onComplete) {
        onComplete();
      }
      ClosePayout();
    } catch (err) {
      setPayingBank(false);
      if (err.response) {
        if (err.response.data.message === 'Unauthorized') {
          localStorage.removeItem('konnect_token');
          navigate('/');
        }
        setErrorMessage(err?.response?.data?.message);
      } else {
        openNotificationWithIcon('error', 'Something went wrong', err?.message);
      }
    }
  };
  const OutWalletTrans = async (values) => {
    if (fundOptions === 'konnect' && transferTo === 'wallet_balance') {
      setKonnectTransferModal(true);
      setTransferInfo(values);
    } else {
      transferOutWallet(values);
    }
  };
  const transferOutWallet = async (values) => {
    setPayingWallet(true);
    try {
      const data = {
        account_id: accNo,
        account_type: 'wallet',
        amount: values?.amount,
        narration: `${values?.naration}`,
        currency: 'NGN',
      };
      const PayOut = await _payout_internal(data);
      setPayingWallet(false);
      setFundOptions('wallet');
      setBenDetails(false);
      setKonnectTransferModal(false);
      setTransferType('bank');
      form.resetFields();
      setTransferTo('');
      setAccountName('');
      setPayout(false);
      setTransferInfo({});
      setNormalCommission(0);
      dispatch(updateCount(updateCounts + 1));
      openNotificationWithIcon(
        'success',
        `${PayOut?.data?.title}`,
        `${PayOut?.data?.message}`
      );
      if (onComplete) {
        onComplete();
      }
      ClosePayout();

    } catch (err) {
      setPayingWallet(false);
      if (err.response) {
        if (err.response.data.message === 'Unauthorized') {
          localStorage.removeItem('konnect_token');
          navigate('/');
        }
        setErrorMessage(err?.response?.data?.message);
      } else {
        openNotificationWithIcon('error', 'Something went wrong', err.message);
      }
    }
  };
  const ClosePayout = () => {
    setPayout(false);
    setErrorMessage(false);
    form.resetFields();
    setTransferType('bank');
    setTransferTo('');
    setFundOptions('');
    setBenDetails(false);
    setAccountName('');
    setNormalCommission(0);
    setTotalCommission(0);
    setVerifiedPin(false);
  };
  const VerifyPin = async (values) => {
    setVerifingPin(true);
    try {
      const verify_pin = await _verify_pin({ pin: values.pin });
      setVerifingPin(false);
      openNotificationWithIcon(
        'success',
        verify_pin?.data?.title,
        verify_pin?.data?.message
      );
      setRevealPinMessage(false);
      setVerifiedPin(true);
    } catch (err) {
      setVerifiedPin(false);
      setVerifingPin(false);
      if (err.response) {
        if (err.response.data.message === 'Unauthorized') {
          openNotificationWithIcon(
            'success',
            err?.response?.data?.title,
            err?.response?.data?.message
          );
          navigate('/signin');
          setRevealPinMessage(false);
        } else {
          setRevealPinMessage(err?.response?.data?.message);
        }
      } else {
        setRevealPinMessage(false);
        openNotificationWithIcon(
          'error',
          'Something went wrong',
          'An error occurred while verifying OTP. Please try again'
        );
      }
    }
  };
  const updateTransferType = (e) => {
    setTransferType(e.target.value);
    form.resetFields();
    setTransferTo('');
    setAccountName('');
    setTransferInfo({});
    setNormalCommission(0);
  };


  const isArrayUserBen = Array.isArray(userBen);


  useEffect(() => {
    form.setFieldsValue({ fee: normalCommission });
  }, [normalCommission, form]);

  useEffect(() => {
    getBeneficiaries({ type: transferType });
  }, [transferType]);

  return (
    <>
      <button
        onClick={() => {
          setPayout(!payOut);
          getBanks();
          getBeneficiaries({ type: transferType });
        }}
        className=""
        style={{ width: 'fit-content ' }}
      >
        Pay Someone
      </button>
      <Modal
        centered={true}
        title=""
        open={payOut}
        footer={null}
        className="pb-5 pt-5"
      >
        {profileData && verifiedPin ? (
          <div style={{ height: '400px', overflowY: 'auto' }}>
            <h2 style={{ fontSize: '2.5rem' }}>
              Transfer to bank & Konnect wallet
            </h2>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <div style={{ marginBottom: '10px' }}>
              <Radio.Group
                size="large"
                buttonStyle="solid"
                onChange={updateTransferType}
                defaultValue={transferType}
              >
                <Radio.Button
                  value="bank"
                  style={{ margin: '5px', borderRadius: '10px' }}
                >
                  To bank
                </Radio.Button>
                <Radio.Button
                  value="wallet"
                  style={{ margin: '5px', borderRadius: '10px' }}
                >
                  To wallet
                </Radio.Button>
              </Radio.Group>
            </div>

            {transferType === 'bank' ? (
              <>
                <Form
                  form={form}
                  onValuesChange={UpdateSendToBank}
                  onFinish={BankTrans}
                  initialValues={{ transOpt: 'wallet' }}
                  layout="vertical"
                >
                  {loadingBen && (
                    <>
                      <label>Selct Beneficiary</label>
                      <Spin size="small" />
                    </>
                  )}
                  {isArrayUserBen && !loadingBen && (
                    <Form.Item name="beneficiary" label="Select Beneficiary">
                      <Select
                        style={{ width: '100%' }}
                        placeholder="Select a beneficiary"
                        onChange={handleBeneficiaryChange}
                        value={selectedBeneficiary?.account_number || undefined}
                      >
                        {userBen.map((beneficiary) => (
                          <Option
                            key={beneficiary.id}
                            value={beneficiary.account_number}
                          >
                            {beneficiary.account_name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  )}
                  {allBanks ? (
                    <Form.Item name="bank" label="Bank Name">
                      <Select
                        placeholder="Select Bank"
                        labelInValue
                        showSearch
                        optionFilterProp="value"
                      >
                        <>
                          {allBanks && (
                            <>
                              {allBanks.map((bank) => (
                                <Select.Option
                                  key={bank.nipCode}
                                  title={bank.nipCode}
                                  value={bank.name}
                                >
                                  {bank.name}
                                </Select.Option>
                              ))}
                            </>
                          )}
                        </>
                      </Select>
                    </Form.Item>
                  ) : (
                    <Form.Item name="bank" label="Bank Name">
                      <Select></Select>
                    </Form.Item>
                  )}
                  <span
                    style={{
                      paddingBottom: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <label>Account Number</label>
                    {loadingBankDetails && (
                      <Button disabled loading type="text">
                        Loading
                      </Button>
                    )}
                  </span>
                  <Form.Item name="accNo">
                    <Input placeholder="Account Number" />
                  </Form.Item>
                  <Form.Item name="accName" label="Account Name">
                    <Input
                      disabled
                      placeholder="Account Name"
                      value={accountName}
                    />
                  </Form.Item>
                  <span
                    style={{
                      paddingBottom: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <label>Amount</label>
                    {loadingCommission && (
                      <Button disabled loading type="text">
                        Loading
                      </Button>
                    )}
                  </span>
                  <Form.Item name="amount">
                    <Input placeholder="Amount" />
                  </Form.Item>
                  <Form.Item label="Fee" name="fee">
                    <Input
                      disabled
                      placeholder="Fee"
                      value={normalCommission}
                    />
                  </Form.Item>
                  <Form.Item name="narration" label="Narration">
                    <Input placeholder="Narration" />
                  </Form.Item>
                  <div className="d-flex justify-content-between">
                    <Button onClick={ClosePayout}>Cancel</Button>
                    {benDetails ? (
                      <>
                        {payingBank ? (
                          <Button disabled loading type="primary">
                            Proceed
                          </Button>
                        ) : (
                          <Button
                            htmlType="submit"
                            type="primary"
                            style={{ background: 'green' }}
                          >
                            Proceed
                          </Button>
                        )}
                      </>
                    ) : (
                      <Button disabled type="primary">
                        Proceed
                      </Button>
                    )}
                  </div>
                </Form>
              </>
            ) : (
              <>
                <Form
                  form={form}
                  onFinish={OutWalletTrans}
                  onValuesChange={UpdateSendToWallet}
                  layout="vertical"
                >
                  {loadingBen && (
                    <>
                      <label>Selct Beneficiary</label>
                      <Spin size="small" />
                    </>
                  )}
                  {isArrayUserBen && !loadingBen && (
                    <Form.Item name="beneficiary" label="Select Beneficiary">
                      <Select
                        style={{ width: '100%' }}
                        placeholder="Select a beneficiary"
                        onChange={handleWalletBeneficiaryChange}
                        value={selectedBeneficiary?.account_number || undefined}
                      >
                        {userBen.map((beneficiary) => (
                          <Option
                            key={beneficiary.id}
                            value={beneficiary.account_number}
                          >
                            {beneficiary.account_name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  )}
                  <span
                    style={{
                      paddingBottom: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <label>Account ID</label>
                    {loadingWalletDetails && (
                      <Button disabled loading type="text">
                        Loading
                      </Button>
                    )}
                  </span>
                  <Form.Item name="accNo">
                    <Input placeholder="Account ID" />
                  </Form.Item>
                  <Form.Item name="accName" label="Account Name">
                    <Input
                      disabled
                      placeholder="Account Name"
                      value={accountName}
                    />
                  </Form.Item>
                  <span
                    style={{
                      paddingBottom: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <label>Total Amount</label>
                    {loadingCommission && (
                      <Button disabled loading type="text">
                        Loading
                      </Button>
                    )}
                  </span>
                  <Form.Item name="amount">
                    <Input placeholder="Amount" />
                  </Form.Item>
                  <Form.Item label="Fee" name="fee">
                    <Input
                      disabled
                      placeholder="Fee"
                      value={normalCommission}
                    />
                  </Form.Item>
                  <Form.Item name="naration" label="Naration">
                    <Input placeholder="Naration" />
                  </Form.Item>
                  <div className="d-flex justify-content-between">
                    <Button onClick={ClosePayout}>Cancel</Button>
                    {benDetails && !errorMessage ? (
                      <>
                        {payingWallet ? (
                          <Button disabled loading type="primary">
                            Proceed
                          </Button>
                        ) : (
                          <Button
                            htmlType="submit"
                            type="primary"
                            style={{ background: 'green' }}
                          >
                            Proceed
                          </Button>
                        )}
                      </>
                    ) : (
                      <Button disabled type="primary">
                        Proceed
                      </Button>
                    )}
                  </div>
                </Form>
              </>
            )}
          </div>
        ) : (
          <div>
            <h4 className="modal-title">Transaction Pin</h4>
            {profileData?.pin === '0000' ? (
              <p>Activate 2fa and create transaction pin</p>
            ) : (
              <p>Enter your transaction pin.</p>
            )}
            <div style={{ marginTop: '5%' }}></div>
            {revealPinMessage ? (
              <p className="">{revealPinMessage}</p>
            ) : (
              ''
            )}
            <Form
              layout="vertical"
              style={{ maxWidth: 600 }}
              onFinish={VerifyPin}
              autoComplete="off"
            >
              <Form.Item name="pin">
                {profileData?.pin === '0000' ? (
                  <Input.Password
                    placeholder="Enter Pin"
                    autoComplete="off"
                    disabled
                  />
                ) : (
                  <Input.Password placeholder="Enter Pin" autoComplete="off" />
                )}
              </Form.Item>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                {profileData?.pin === '0000' ? (
                  <>
                    <Button
                      type="primary"
                      style={{ background: '008060' }}
                      onClick={() => {
                        navigate(`/profile/overview?pin=${true}`);
                      }}
                    >
                      Create Transaction Pin
                    </Button>
                  </>
                ) : (
                  <>
                    {verifingPin ? (
                      <Button type="primary" loading disabled>
                        Verifing Pin
                      </Button>
                    ) : (
                      <Button
                        type="primary"
                        style={{ background: '#008060' }}
                        htmlType="submit"
                      >
                        Verify PIN
                      </Button>
                    )}
                  </>
                )}
                <Button onClick={() => setPayout(false)}>Cancel</Button>
              </div>
            </Form>
          </div>
        )}
      </Modal>
      {showTransaction && (
        <div
          style={{
            width: '100%',
            height: '100vh',
            position: 'absolute',
            top: '0',
            left: '0',
            background: 'rgba(0,0,0,0.2)',
            display: 'flex',
          }}
        >
          <div
            style={{
              width: 'fit-content',
              background: 'white',
              margin: 'auto',
              zIndex: '100',
            }}
          >
            {err_status ? (
              <Result
                status="success"
                title={message}
                subTitle=""
                extra={[
                  <Button key="buy" onClick={() => setShowTransaction(false)}>
                    Ok
                  </Button>,
                ]}
              />
            ) : (
              <Result
                status="success"
                title={message}
                subTitle=""
                extra={[
                  <Button key="buy" onClick={() => setShowTransaction(false)}>
                    Ok
                  </Button>,
                ]}
              />
            )}
          </div>
        </div>
      )}
      <Modal
        centered={true}
        open={konnectTransferModal}
        onCancel={() => setKonnectTransferModal(false)}
        footer={null}
      >
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <h2>Note, Konnect balance is primarily to pay for Konnect products.</h2>
        <p>Transfer to wallet may take up to 14 working days.</p>
        <p>
          To complete the transfer & credit within 14 days, <b>click confirm</b>
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '10px',
          }}
        >
          <Button onClick={() => setKonnectTransferModal(false)}>Cancel</Button>
          {errorMessage ? (
            <Button type="primary" disabled>
              Confirm
            </Button>
          ) : (
            <>
              {payingWallet ? (
                <Button disabled loading type="primary">
                  Proceed
                </Button>
              ) : (
                <Button
                  type="primary"
                  onClick={() => transferOutWallet(transferInfo)}
                >
                  Confirm
                </Button>
              )}
            </>
          )}
        </div>
      </Modal>
    </>
  );
}
