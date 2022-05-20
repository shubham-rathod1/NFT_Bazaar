import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Cards from '../Sub_Module/cards';
// var utils = require('ethers').utils;

export default function Home({ market, nft }) {
  const [itemArray, setItemArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadItems = async () => {
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
    console.log(items);
    setItemArray(items);
    setLoading(false);
  };

  const buyNft = async (item) => {
    await (
      await market.PurchaseItem(item.itemId, { value: item.price })
    ).wait();
    loadItems();
  };
  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div>
      {itemArray.length > 0 ? (
        <div>
          <Grid container spacing={2}>
            {itemArray.map((item, id) => (
              <Grid item sm={4}>
                <div>
                  {/* <div>{item.name}</div>
              <button onClick={() => buyNft(item)}>buy</button> */}
                  <Cards item={item} buy = {buyNft} />
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      ) : (
        'no items listed'
      )}
    </div>
  );
}
