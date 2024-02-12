import React, { useState, useEffect } from 'react';
import useAeternitySDK from './Scripts/useAeternitySDK.ts';
import { AE_AMOUNT_FORMATS } from '@aeternity/aepp-sdk';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home.jsx';
import SubmitProposal from './pages/SubmitProposal';
import ProcessProposal from './pages/ProcessProposal';
import CheckVotes from './pages/CheckVotes.jsx';

function App() {
  const { aeSdk, address, networkId, connectToWallet } = useAeternitySDK();
  const [balance, setBalance] = useState(null);
  useEffect(() => {
    const handleConnectClick = async () => {
      try {
        await connectToWallet();
      } catch (error) {
        if (!(error instanceof Error)) throw error;
      }
    };
    handleConnectClick();
  }, );

  useEffect(() => {
    // handleConnectClick()
    const fetchBalance = async () => {
      if (networkId == null || address == null) return;

      try {
        const _balance = await aeSdk.getBalance(address, { format: AE_AMOUNT_FORMATS.AE });
        setBalance(_balance);
      } catch (error) {
        if (!(error instanceof Error)) throw error;
      }
    };

    fetchBalance();
  }, [aeSdk, networkId, address]);

  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home balance={balance} address={address} aeSdk={aeSdk} />} />
          <Route path='/Submit' element={<SubmitProposal aeSdk={aeSdk} />} />
          <Route path='/Process' element={<ProcessProposal aeSdk={aeSdk} />} />
          <Route path='/votes' element={<CheckVotes aeSdk={aeSdk} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
