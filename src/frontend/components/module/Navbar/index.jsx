import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import StoreIcon from '@mui/icons-material/Store';
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
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Typography
            variant='h4'
            noWrap
            component='div'
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <StoreIcon sx={{ fontSize: '40px' }} />
            <NavLink
              style={{
                textDecoration: 'none',
                color: 'white',
                margin: '3px 0px 0px 20px',
                fontSize: '30px',
              }}
              to='/'
            >
              NFT बाजार
            </NavLink>
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
            }}
          >
            {pages.map((item) => {
              return (
                <Button
                  key={item.title}
                  onClick={() => handleRedirect(item.url)}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {item.title}
                </Button>
              );
            })}
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'flex-end',
            }}
          >
            <Button
              onClick={() => wallet()}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {!account ? (
                <AccountBalanceWalletIcon sx={{ fontSize: '30px' }} />
              ) : (
                account
              )}
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
