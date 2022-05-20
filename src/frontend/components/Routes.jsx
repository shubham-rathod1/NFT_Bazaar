import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Create from './module/Create';
import Home from './module/Home';
import MyNfts from './module/List/myNfts';
import Purchase from './module/Purchase';

export default function Router({ market, nft, account }) {
  return (
    <Routes>
      <Route
        path='/'
        exact='true'
        element={<Home market={market} nft={nft} />}
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
    </Routes>
  );
}
