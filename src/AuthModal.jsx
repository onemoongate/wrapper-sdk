// src/AuthModal.js

import React, {useState, useEffect} from 'react';
import '../dist/tailwind.output.css';
function AuthModal(props) {
    const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>

      {props?.connected == false ? (
        <button className='bg-purple-600 px-12 py-2.5 font-mono text-base text-white' onClick={() =>{
            setModalOpen(true);
        }}>Connect Wallet</button>
      ) : (
        <button className='bg-purple-600 px-12 py-2.5 font-mono text-base' onClick={() => {
            setModalOpen(true);
        }}>Connected</button>
      )}

    {modalOpen ? (<div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-800 py-10 sm:p-8 rounded shadow-lg sm:px-20 sm:py-20">
        <div>
       
          <label className="block text-white font-bold tracking-widest">Connect Your Wallet</label>
       </div>
        {/* make a 2 column div */}
        {props?.connected == false ? (
        <div className="grid grid-cols-2 space-x-4 mt-8">

            <div>
                <button className="bg-white px-12 py-2.5 text-black font-mono text-xl sm:text-2xl" onClick={() => {
                    setModalOpen(false);
                    props?.select('MoonGate');
                }}>Ethereum Wallet
                </button>
            </div>
            <div>
                <button className="bg-purple-600 px-12 py-2.5 font-mono text-xl sm:text-2xl text-white" onClick={() => {
                    setModalOpen(false);
                    props?.setVisible(true);
                }}>Solana Wallet</button>
            </div>
        </div> ) : (
            <div>
              <button onClick={() => { 
              props?.select(null)
              setModalOpen(false);}} className="bg-white px-12 py-2.5 text-black font-mono text-base">Disconnect</button> 
            </div>
            )
        }
      </div>
    </div>) :
     <>
     </>}
    </div>
  );
}

export default AuthModal;
