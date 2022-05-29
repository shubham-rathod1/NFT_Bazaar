import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import StoreIcon from '@mui/icons-material/Store';
// import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';
import './index.scss';

const pages = [
  { title: 'Market', url: '/' },
  { title: 'Create', url: '/create' },
  { title: 'Listed Items', url: '/allitems' },
  { title: 'Purchased Items', url: '/purchase' },
];
export default function Header({ wallet, account }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  let history = useNavigate();
  const handleRedirect = (url) => {
    history(url);
    console.log(url);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className='navbar_container'>
      <div className='app_logo'>
        <h3>
          <span>NFT</span> BAZAR
        </h3>
      </div>
      <div className='app_links'>
        <a>Discover</a>
        <a>Hotest Birds</a>
        <a>Artists</a>
        <a>Community</a>
      </div>
      <div className='wallet_icon_container'>
        {
          account ? 
          <Tooltip title={account} placement="left-start">
          <AccountCircleIcon fontSize='large' className='wallet_icon' onClick={handleClick} />
          </Tooltip>
           :<Button
          onClick={() => wallet()}
          variant='outlined'
          className='connect_btn'
          startIcon={<AccountBalanceWalletIcon />}
        >
          Connect
        </Button>
        }
        <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <NavLink to='/dashboard' className='popover_link'>
         <Typography style={{cursor: 'pointer'}} sx={{ p: 0.5 }}>DASHBOARD</Typography>
        </NavLink>
      </Popover>
      </div>
    </div>
  );
}
