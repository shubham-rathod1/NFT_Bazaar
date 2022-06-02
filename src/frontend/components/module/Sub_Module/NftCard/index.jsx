import React from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import './index.scss';
import { ethers } from 'ethers';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Avatar from '@mui/material/Avatar';
function NftCard({ item, buy }) {
  return (
    <div className='nft_card_container'>
      <div className='img_div'>
        <img src={item.image} alt='nft' />  
      </div>
      <div className='info_div'>
        <div className='title'>
          <h3> {item.name} </h3>
          <span>
            <Tooltip title={item.owner} placement='left-start'>
              <Avatar
                sx={{ border: '1px solid lightgray', bgcolor: 'white' }}
                alt='Remy Sharp'
              >
                <PersonOutlineIcon className='wallet_icon' wallet_icon />
              </Avatar>
            </Tooltip>
          </span>
        </div>
        <p>{item.description} </p>

        <div className='price_div'>
          <div>
            <h5>price:{item.price && (ethers.utils.formatEther(item.price))}</h5> <span>ETH</span>
          </div>
          <div>
            <Button
              onClick={() => buy(item)}
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
