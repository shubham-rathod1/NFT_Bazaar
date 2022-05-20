import { Grid } from '@mui/material';
import { ethers } from 'ethers';
import React, { useState, useEffect } from 'react';
import Cards from '../Sub_Module/cards';

export default function MyNfts({ market, nft, account }) {
  const [nftList, setNftList] = useState([]);
  const [soldList, setSoldList] = useState([]);
  // const [] = useState()

  const LoadlistedItems = async () => {
    const count = await market.s_itemCount();
    let listedItems = [];
    let soldItems = [];
    for (let i = 1; i <= count; i++) {
      const item = await market.items(i);
      if (item.seller.toLowerCase() === account) {
        // get uri url from nft contract
        const uri = await nft.tokenURI(item.nftId);
        // use uri to fetch the nft metadata stored on ipfs
        const response = await fetch(uri);
        const metadata = await response.json();
        // get total price of item (item price + fee)
        // const totalPrice = item.price;
        // define listed item object
        let payload = {
          // totalPrice,
          seller: item.seller,
          price: item.price,
          itemId: item.itemId,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
        };
        console.log(payload);
        listedItems.push(payload);
        // Add listed item to sold items array if sold
        if (item.sold) soldItems.push(payload);
      }
    }

    setNftList(listedItems);
    setSoldList(soldItems);
  };
  useEffect(() => {
    LoadlistedItems();
  }, []);

  // console.log("my array",nftList);
  const buyNft = async (item) => {
    const cost = item.price;
    console.log(
      'my item value',
      ethers.utils.parseEther(item.price.toString())
    );
    await (
      await market.PurchaseItem(item.itemId, { value: item.price })
    ).wait();
  };

  return (
    <div>
      {nftList.length > 0 ? (
        <div>
          <Grid container spacing={2}>
            {nftList.map((item) => (
              <Grid item sm={4}>
                <div>
                  <Cards item={item} buy={buyNft} />
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      ) : (
        'no nfts created'
      )}
      <div>
        <h3 style={{ textAlign: 'center', margin: '50px' }}>
          this are the sold ones
        </h3>
        <div>
          {soldList.length > 0 ? (
            <div>
              <Grid container spacing={2}>
                {soldList.map((item) => (
                  <Grid item sm={4}>
                    <div>
                      <Cards item={item} buy={buyNft} />
                    </div>
                  </Grid>
                ))}
              </Grid>
            </div>
          ) : (
            'no nfts sold yet!'
          )}
        </div>
      </div>
    </div>
  );
}
