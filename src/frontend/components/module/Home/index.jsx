import { Grid } from '@mui/material';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import Cards from '../Sub_Module/cards';
import NftCard from '../Sub_Module/NftCard';
import './index.scss';
// var utils = require('ethers').utils;

export default function Home({ market, nft }) {
  const [itemArray, setItemArray] = useState([1,1,1,1,1,1,11,1,1,1,1,1,1,1]);
  const [loading, setLoading] = useState(false);
  const loadItems = async () => {
    // setLoading(true);
    const count = await market.s_itemCount();
    console.log(count.toNumber());
    let items = [];
    for (let i = 1; i <= count; i++) {
      const item = await market.items(i);
      if (!item.sold) {
        // get uri from nft contract
        console.log(item);
        const uri = await nft.tokenURI(item.nftId);
        // use uri to fetch nft metadata
        const response = await fetch(uri);
        const metadata = await response.json();
        items.push({
          price: item.price,
          itemId: item.itemId,
          seller: item.seller,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
        });
      }
    }
    console.log('NFT',items);
    setItemArray(items);
    setLoading(false);
  };

  const buyNft = async (item) => {
    try {
      await (
        await market.PurchaseItem(item.itemId, { value: item.price + 1 })
      ).wait();
      loadItems();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    loadItems();
  }, []);

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
          'no items listed'
        )
      ) : (
        'loading'
      )}
    </div>
  );
}
