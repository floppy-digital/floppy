import React from 'react';
import { useSelector } from 'react-redux';
import ConnectWalletButton from './ConnectWalletButton';

const Header = () => {
  const isAuthenticated = useSelector((state) => state.user.authenticated);
  const address = useSelector((state) => state.user.address);

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
