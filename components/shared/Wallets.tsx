"use client"
import React, { useState } from 'react';

const WalletAddresses = () => {
  const [addresses] = useState([
    'TN6r2bhYxMM5tsYtLWdUNYc7hTLptLfQgq TRC20', // Wallet 1
    '12quVJbszHPGeBcQXazpn69tAQimYkopvw BTC', // Wallet 2
    '0xa0dd78bab8b4345053f6b52951d9abcb01f61e08 Ethereum (ERC20)', // Wallet 3
    '0xa0dd78bab8b4345053f6b52951d9abcb01f61e08 USDT BSC (BEP20)', // Wallet 4
  ]);

  const copyToClipboard = (address:any) => {
    navigator.clipboard.writeText(address)
      .then(() => {
        // alert('Address copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy address:', err);
      });
  };

  return (
    <div className="w-full mt-[5rem] p-6  shadow-lg z-0">
      <h2 className="text-center text-lg font-semibold mb-4">Please choose your currency and make payment to any of the wallets</h2>
      {addresses.map((address, index) => (
        <div key={index} className="mb-4 text-center">
          <p className="text-sm text-gray-600">Wallet Address {index + 1}:</p>
          <div className="font-mono text-lg bg-gray-200 p-3 rounded-md mb-2">{address}</div>
          <button
            onClick={() => copyToClipboard(address)}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Copy Address {index + 1}
          </button>
        </div>
      ))}
    </div>
  );
};

export default WalletAddresses;
