import { Button, message, Modal } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import walletIcon from '../../assets/images/icons/payment_processing.svg';
import FundWalletModalContainer from '../transactions/FundWalletModal';

const TopUpWalletButton = ({ userTransferData }) => {















  return (
    <>
      <FundWalletModalContainer>
        <Button
          type="default"
          className="flex my-5 items-center justify-between hover:text-black focus:text-black px-6 py-10 w-full bg-[#FDF4D7] text-black rounded-2xl border border-black hover:bg-[#FDF4D7]"
        >
          <div className="flex items-center space-x-3">
            <img src={walletIcon} alt="Wallet" className="w-10 h-10" />
            <span className="text-2xl text-black font-semibold">
              Fund Wallet
            </span>
          </div>
          <ArrowRightOutlined />
        </Button>
      </FundWalletModalContainer>


    </>
  );
};

export default TopUpWalletButton;
