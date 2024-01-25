// src/AuthModal.js

import React, { useState, useEffect, useRef } from 'react';
import '../dist/tailwind.output.css';
import moongate from './img/mg.png';
import metamask from './img/metamask.png';
import ethereum from './img/ethereum.png';
import solana from './img/solana.png';
function AuthModal(props) {
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false);
      }
    }
    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);
  return (
    <div>

      {props?.connected == false ? (
        <button className={`bg-purple-600 px-12 py-2.5 font-mono text-base ${props.btnStyles}`} onClick={() => {
          setModalOpen(true);
        }}>Connect Wallet</button>
      ) : (
        <button className={`bg-purple-600 px-12 py-2.5 font-mono text-base ${props.btnStyles}`} onClick={() => {
          setModalOpen(true);
        }}>Connected</button>
      )}

      {modalOpen ? (<div className="fixed inset-0 flex items-center justify-center z-50">
        <div ref={modalRef} className={`bg-gray-800 py-10 sm:p-8 rounded shadow-lg sm:px-20 sm:py-15 ${props.modalStyles}`}>
          {props?.connected == false ? (
            <div>
              <label className="block text-white font-bold tracking-widest">Select a Wallet</label>
            </div>) : (
            <div>
              <label className="block text-white font-bold tracking-widest">Manage Wallet Connection</label>
            </div>)}
          {/* make a 2 column div */}
          {props?.connected == false ? (
            <div>
              <div className="grid grid-cols-2 space-x-4 mt-8">
                <div>
                  <button
                    className="flex items-center rounded-md bg-white text-black font-mono text-xl sm:text-2xl border-none shadow-xl hover:shadow-black  hover:animate-pulse cursor-pointer"
                    onClick={() => {
                      setModalOpen(false);
                      props?.select('Ethereum Wallet');
                    }}
                  >
                    {/* Sample image placeholder, replace 'path_to_your_image.jpg' with your image path */}
                    <img src={ethereum} alt="ethereum" className="h-32" />
                    <span className="mx-2">Ethereum Wallet</span>
                  </button>
                </div>
                <div>
                  <button
                    className="flex items-center bg-purple-600 rounded-md py-2 font-mono text-xl sm:text-2xl text-white border-none shadow-xl hover:shadow-gray-600  hover:animate-pulse cursor-pointer"
                    onClick={() => {
                      setModalOpen(false);
                      props?.setVisible(true);
                    }}
                  >
                    {/* Sample image placeholder, replace 'path_to_your_image.jpg' with your image path */}
                    <img src={solana} alt="Solana" className="h-28" />

                    <span className="mx-2">Solana Wallet</span>
                  </button>
                </div>
              </div>
              <div className="inline-flex mt-8 space-x-2 grid-cols-2 hover:animate-pulse cursor-pointer" onClick={() => { window.location.href = "https://moongate.one" }}>
                <div>
                  <p className="text-sm">Powered by</p>
                </div>
                <div className="">
                  <img src={moongate} width={80} className="pt-3.5" />
                </div>
              </div>
            </div>) : (
            <button onClick={() => {
              props?.select(null)
              setModalOpen(false);
            }} className="bg-white px-12 py-2.5 text-black font-mono text-base border-none mt-4 shadow-xl hover:shadow-black cursor-pointer">Disconnect</button>
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
