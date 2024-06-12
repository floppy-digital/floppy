import React, { useContext } from 'react';
import { userContext } from '@/lib/contexts/userContext';
import ConnectWalletButton from './ConnectWalletButton';

const Header = () => {
  const { address, isAuthenticated } = useContext(userContext);

  return (
    <div id="header">
      <ConnectWalletButton />
      {isAuthenticated ? (
        <div>{`${address.slice(0, 5)}...${address.slice(-4)}`}</div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default Header;
