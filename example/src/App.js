import logo from './logo.svg';
import './App.css';
import { AuthModal } from 'wrapper-sdk';
import { useMemo } from 'react';
import { WalletMultiButton, WalletDisconnectButton, useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
function App(wallet) {
  const { select, connected } = useWallet();
  const { visible, setVisible } = useWalletModal();
  return (
    <div className="App">
      <header className="App-header">
        <AuthModal select={select} connected={connected} setVisible={setVisible} />
      </header>
    </div>
  );
}

export default App;
