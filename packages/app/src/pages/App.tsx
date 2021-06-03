// import React, { useState } from 'react';
import logo from '../assets/images/ethereumLogo.png';
import WalletModal from '../components/WalletModal';
import useWeb3Modal from '../hooks/useWeb3Modal';
// import useWeb3Modal from '../hooks/useWeb3Modal';
import './App.css';
// import { useUserAddress } from "eth-hooks";
// import useGetAddress from '../hooks/useGetAddress';

function App() {

    const { provider, loadWeb3Modal, logoutOfWeb3Modal } = useWeb3Modal();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <WalletModal provider={provider} loadWeb3Modal={loadWeb3Modal} logoutOfWeb3Modal={logoutOfWeb3Modal} />
      </header>
    </div>
  );
}

export default App;
