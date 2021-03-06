import React, { useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import { Grid } from '@mui/material';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import StoreIcon from '@mui/icons-material/Store';
import NftCard from '../Sub_Module/NftCard';
import './index.scss';
import NftSellCard from '../Sub_Module/NftSellCard';
import Header from '../Navbar';
import { ethers } from 'ethers';
const drawerWidth = 240;
function Dashboard({ market, nft, account }) {
  const [loading, setLoading] = useState(true);
  const [bought, setBought] = useState([]);

  const OwnedNfts = async () => {
    //get owners
    // query the event for buyer;
    setLoading(true);
    let items = [];
    const count = await market.s_itemCount();
    for (let i = 1; i <= count; i++) {
      const item = await market.items(i);
      console.log("my item",item)
      const owner = await market.s_owners(item.nftId);
      if (owner == ethers.utils.getAddress(account)) {
        const uri = await nft.tokenURI(item.nftId);
        const response = await fetch(uri);
        const metadata = await response.json();
        let payload = {
          price: item.price,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
          owner: item.owner,
          nftId: item.nftId
        };
        items.push(payload);
      }
    }
    //**this you can use to query the events */!important
    // const filter = market.filters.Sold(null, null, null, null, account);
    // const results = await market.queryFilter(filter);

    // const purchases = await Promise.all(
    // results.map(async (item) => {
    // fetch arguments from each result
    // item = item.args;
    // get uri url from nft contract
    // const uri = await nft.tokenURI(item.nftId);
    // use uri to fetch the nft metadata stored on ipfs
    // const response = await fetch(uri);
    // const metadata = await response.json();
    // get total price of item (item price + fee)
    // const totalPrice = await marketplace.getTotalPrice(i.itemId);
    // define listed item object
    // let payload = {
    //   price: item.price,
    //   itemId: item.itemId,
    //   name: metadata.name,
    //   description: metadata.description,
    //   image: metadata.image,
    //   owner: item.owner,
    // };
    // return payload;
    // })
    // );

    setBought(items);
    setLoading(false);
  };
  useEffect(() => {
    OwnedNfts();
  }, []);
  return (
    <>
      <div className='dashboard_container'>
        <div>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
            variant='permanent'
            anchor='left'
          >
            <Toolbar>
              <h3>DASHBOARD</h3>
            </Toolbar>
            <Divider />
            <List>
              {[{ text: 'My NFTs', icon: <StoreIcon /> }].map((item, index) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>
        </div>
        <div>
          {loading && <h2>Loading...</h2>}
          <Grid container spacing={2}>
            {bought?.map((item, id) => (
              <Grid item sm={6} key={id}>
                <div>
                  <NftSellCard item={item} market={market} nft={nft} />
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
