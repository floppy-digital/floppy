import React from 'react';
import Web3 from 'web3';
import { signInWithCustomToken, signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthenticated, setAddress } from '../Redux/user';
import axios from 'axios';

const ConnectWalletButton = () => {
  const isAuthenticated = useSelector((state) => state.user.authenticated);
  const dispatch = useDispatch();

  async function authenticate(address) {
    const { data: message } = await axios.get(
      `/api/login/message?address=${address}`
    );

    const web3 = new Web3(Web3.givenProvider);

    const signature = await web3.eth.personal.sign(message, address);

    const { data: token } = await axios.get(
      `/api/login/token?address=${address}&signature=${signature}`
    );

    await signInWithCustomToken(auth, token);
    dispatch(setAuthenticated(true));
    dispatch(setAddress(address));
  }

  async function login() {
    if (window?.ethereum?.isMetaMask) {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      const ethAddress = accounts[0];

      authenticate(ethAddress);
    }
  }

  async function logout() {
    dispatch(setAuthenticated(false));
    dispatch(setAddress(null));
    signOut(auth);
  }

  return (
    <div>
      {!isAuthenticated ? (
        <button onClick={login}>Connect</button>
      ) : (
        <button onClick={logout}>Logout</button>
      )}
    </div>
  );
};

export default ConnectWalletButton;
