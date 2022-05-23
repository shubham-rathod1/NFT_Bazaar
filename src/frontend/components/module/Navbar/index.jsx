import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import StoreIcon from '@mui/icons-material/Store';
// import Button from '@mui/material/Button';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Button,
  Link,
} from '@mui/material';
import './index.scss'

const pages = [
  { title: 'Market', url: '/' },
  { title: 'Create', url: '/create' },
  { title: 'Listed Items', url: '/allitems' },
  { title: 'Purchased Items', url: '/purchase' },
];
export default function Header({ wallet, account }) {
  let history = useNavigate();
  const handleRedirect = (url) => {
    history(url);
    console.log(url);
  };

  return (
    <div className='navbar_container'>
      <div className='app_logo'>
        <h3><span>NFT</span> BAZAR</h3>
      </div>
      <div className='app_links'>
        <a>Discover</a>
        <a>Hotest Birds</a>
        <a>Artists</a>
        <a>Community</a>
      </div>
      <div className='wallet_icon_container'>
      
        <Button variant="outlined" className='connect_btn' startIcon={<AccountBalanceWalletIcon className='wallet_icon'/>}>
        Connect
      </Button>
      </div>
    </div>
  );
}
