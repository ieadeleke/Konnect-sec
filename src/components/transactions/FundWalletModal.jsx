import { Button, Form, Input, Modal, notification } from 'antd';
import React from 'react';
import { _get_korapay_dynamic_account, _get_lookup_korapay_transaction } from '../../common/axios_services';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { Copy } from 'lucide-react';

export default function FundWalletModalContainer({ children }) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [account, setAccount] = React.useState(null);

  const openNotificationWithIcon = (type, title, message) => {
    notification[type]({
      message: title ? title : '',
      description: message ? message : '',
      placement: 'bottom-right',
    });
  };

  const createTransferDVA = async ({ amount }) => {
    setLoading(true);
    const reference = uuid();
    try {
      const response = await _get_korapay_dynamic_account({
        amount: parseInt(amount),
        reference,
      });
      setAccount(response.data.data);
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
    } finally {
      setLoading(false);
    }
  };

  const startTransactionPolling = async () => {
    if (!account) {
      return;
    }
    try {
      const response = await _get_lookup_korapay_transaction(
        account.payment_reference
      );
      const result = response.data.data;
      if (result.status === 'success') {
        notification.success({
          message: 'Transaction Successful',
        });
        setOpen(false);
        setAccount(null);
        setLoading(false);
        window.location.reload();
      } else {

        await new Promise((resolve) => setTimeout(resolve, 10000));
        return startTransactionPolling();
      }
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

  return (
    <>
      <div
        onClick={() => {
          setOpen(!open);
        }}
      >
        {children}
      </div>
      <Modal
        centered={true}
        title="Fund Wallet"
        open={open}
        footer={null}
        className="pb-5 pt-5"
      >
        <Form onFinish={createTransferDVA}>

          {account === null ? (
            <Form.Item name="amount">
              <Input
                name="amount"
                type="number"
                placeholder="5000"
                prefix="NGN"
                required
                min={500}
              />
            </Form.Item>
          ) : (
            <div className="text-center pb-8 px-4 max-w-[450px] mx-auto space-y-8">
              <p className="text-[16px]">
                Please fund you wallet by bank transfer with the{' '}
                <strong className="text-red-500">EXACT AMOUNT AS SHOWN</strong>{' '}
                to the following account:
              </p>
              <div className="space-y-2">
                <h1 className="text-6xl">
                  <span style={{ fontWeight: 'lighter' }}>₦</span>
                  {account.amount.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </h1>
                <h1 className="text-6xl">
                  <span className="flex justify-center gap-6">
                    {account.bank_account.account_number}
                    <Copy
                      className="text-green-700 my-auto"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          account.bank_account.account_number
                        );
                        notification.success({
                          message: 'Copied!',
                          description: 'Account number copied to clipboard.',
                          placement: 'bottom-right',
                        });
                      }}
                      style={{ cursor: 'pointer' }}
                    />
                  </span>
                </h1>
                <h1 className="text-3xl text-gray-600">
                  {account.bank_account.bank_name}&nbsp;|&nbsp;
                  {account.bank_account.account_name}
                </h1>
              </div>
              <p className="text-[16px]">
                <strong>Important:</strong> This account number is for a{' '}
                <strong className="text-red-500">ONE TIME USE ONLY</strong> and
                valid for the next 20 minutes. Please complete your transfer
                within this timeframe.
              </p>
            </div>
          )}

          <div className="d-flex justify-content-between">
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            {account === null ? (
              <Button
                type="primary"
                loading={loading}
                disabled={loading}
                htmlType="submit"
              >
                Generate Account
              </Button>
            ) : (
              <Button
                type="primary"
                loading={loading}
                disabled={loading}
                onClick={async () => {
                  setLoading(true);
                  notification.success({
                    message: 'Verifying transaction',
                    description:
                      'We are verifying your transaction, this will only take about a minute.',
                  });
                  await startTransactionPolling();
                }}
              >
                I have made Transfer
              </Button>
            )}
          </div>
        </Form>
      </Modal>
    </>
  );
}
