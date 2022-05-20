import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Create from './module/Create';
import Home from './module/Home';

export default function Router({ market, nft }) {
  return (
    <Routes>
      <Route
        path='/'
        exact='true'
        element={<Home market={market} nft={nft} />}
      />
      <Route path='/create' element={<Create market={market} nft={nft} />} />
    </Routes>
  );
}
