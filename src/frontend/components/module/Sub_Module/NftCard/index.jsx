import React from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import './index.scss';
import { ethers } from 'ethers';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Avatar from '@mui/material/Avatar';
function NftCard({ item, buy }) {
  console.log('item', item);
  return (
    <div className='nft_card_container'>
      <div className='img_div'>
        <img src='./spidy.png' alt='nft' />
      </div>
      <div className='info_div'>
        <div className='title'>
          <h3> Spidy </h3> 
          <span>  
          <Tooltip title={item.seller} placement="left-start">
             <Avatar
        sx={{ border: '1px solid lightgray', bgcolor: 'white' }}
        alt="Remy Sharp"
      >
        <PersonOutlineIcon className='wallet_icon' wallet_icon />
      </Avatar>
      </Tooltip>
       </span>
        </div>
        <p>{item.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quis explicabo velit inventore quo deleniti, optio consequatur excepturi vel vero officiis praesentium neque placeat reiciendis, enim a, eveniet ratione tempore? </p>

        <div className='price_div'>
          <div>
            <h5>Current Price</h5> <span>0.00</span>{' '}
            <span>ETH</span>
          </div>
          <div>
            <Button
              onClick={() => buy()}
              variant='outlined'
              className='buy_btn'
            >
              BUY
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NftCard;
