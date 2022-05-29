import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Create from './module/Create';
import Dashboard from './module/Dashboard';
import Home from './module/Home';
import Landing from './module/Landing';
import MyNfts from './module/List/myNfts';
import Purchase from './module/Purchase';

export default function Router({ market, nft, account, wallet }) {
  console.log("this is from route",market, nft);
  return (
    <Routes>
      <Route
        path='/'
        exact='true'
        element={<Landing market={market} nft={nft} wallet={wallet} account={account} />}
      />
      <Route path='/create' element={<Create market={market} nft={nft} />} />
      <Route
        path='/allitems'
        element={<MyNfts market={market} nft={nft} account={account} />}
      />
      <Route
        path='/purchase'
        element={<Purchase market={market} nft={nft} account={account} />}
      />
      <Route
        path='/dashboard'
        element={<Dashboard market={market} nft={nft} account={account} />}
      />
    </Routes>
  );
}
