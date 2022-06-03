import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './module/Dashboard';
import Landing from './module/Landing';
export default function Router({ market, nft, account, wallet }) {
  return (
    <Routes>
      <Route
        path='/'
        exact='true'
        element={
          <Landing
            market={market}
            nft={nft}
            wallet={wallet}
            account={account}
          />
        }
      />
      <Route
        path='/dashboard'
        element={<Dashboard market={market} nft={nft} account={account} />}
      />
    </Routes>
  );
}
