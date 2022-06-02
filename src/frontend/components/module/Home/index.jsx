import { Grid } from '@mui/material';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import Cards from '../Sub_Module/cards';
import NftCard from '../Sub_Module/NftCard';
import './index.scss';
// var utils = require('ethers').utils;

export default function Home({ market, nft }) {
  const [itemArray, setItemArray] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadItems = async () => {
    setLoading(true);
    // console.log('market', market);
    const count = await market.s_itemCount();
    let items = [];
    for (let i = 1; i <= count; i++) {
      const item = await market.items(i);
      if (!item.sold) {
        // get uri from nft contract
        const uri = await nft.tokenURI(item.nftId);
        // use uri to fetch nft metadata
        const response = await fetch(uri);
        const metadata = await response.json();
        items.push({
          price: item.price,
          itemId: item.nftId,
          owner: item.owner,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
        });
      }
    }
    setItemArray(items);
    setLoading(false);
  };

  const buyNft = async (item) => {
    console.log('id', item.itemId);
    try {
      await (
        await market.PurchaseItem(item.itemId, { value: item.price })
      ).wait();
      await loadItems();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (market) {
      (async () => {
        await loadItems();
      })();
    }
  }, [market]);

  return (
    <div className='home_container'>
      <div className='title'>
        <h2>
          BEST <span>NFTs</span> COLLECTIONS
        </h2>
      </div>
      {!loading ? (
        itemArray.length > 0 ? (
          <div>
            <Grid container spacing={2}>
              {itemArray.map((item, id) => (
                <Grid item sm={3}>
                  <div>
                    <NftCard item={item} buy={buyNft} />
                  </div>
                </Grid>
              ))}
            </Grid>
          </div>
        ) : (
          <img src='not-found.jpg' />
        )
      ) : (
        <h3 style={{ textAlign: 'center' }}>
          Please sign in to view collection
        </h3>
      )}
    </div>
  );
}
