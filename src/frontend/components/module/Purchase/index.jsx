import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Grid } from '@mui/material';
import Cards from '../Sub_Module/cards';

export default function Purchase({ market, nft, account }) {
  const [loading, setLoading] = useState(true);
  const [bought, setBought] = useState([]);

  const purchased = async () => {
    // query the event for buyer;
    const filter = market.filters.Sold(null, null, null, null, account, null);
    const results = await market.queryFilter(filter);
    // console.log('my filter', results);
    const purchases = await Promise.all(
      results.map(async (item) => {
        // fetch arguments from each result
        item = item.args;
        // get uri url from nft contract
        const uri = await nft.tokenURI(item.nftId);
        // use uri to fetch the nft metadata stored on ipfs
        const response = await fetch(uri);
        const metadata = await response.json();
        // get total price of item (item price + fee)
        // const totalPrice = await marketplace.getTotalPrice(i.itemId);
        // define listed item object
        let payload = {
          price: item.price,
          itemId: item.itemId,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
          seller: item.seller,
        };
        return payload;
      })
    );
    setLoading(false);
    setBought(purchases);
  };
  useEffect(() => {
    purchased();
  }, []);
  
  //   const buyNft = async (item) => {
  //     const cost = item.price;
  //     console.log(
  //       'my item value',
  //       ethers.utils.parseEther(item.price.toString())
  //     );
  //     await (
  //       await market.PurchaseItem(item.itemId, { value: item.price })
  //     ).wait();
  //   };
  return (
    <div>
      {!loading ? (
        bought.length > 0 ? (
          <div>
            <Grid container spacing={2}>
              {bought.map((item, id) => (
                <Grid item sm={4} key={id}>
                  <div>
                    {console.log(item)}
                    <Cards item={item} buy={null} />
                  </div>
                </Grid>
              ))}
            </Grid>
          </div>
        ) : (
          'no items Purchased yet!'
        )
      ) : (
        'loading...'
      )}
    </div>
  );
}
