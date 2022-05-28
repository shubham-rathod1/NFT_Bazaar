import React from 'react';
import Button from '@mui/material/Button';
import './index.scss';
import { ethers } from 'ethers';
function NftCard({ item, buy }) {
  return (
    <div className='nft_card_container'>
      <div className='img_div'>
        <img src={item.image} alt='nft' />
      </div>
      <div className='info_div'>
        <div className='title'>
          <h3>{item.name} </h3> <span>{item.seller}</span>
        </div>
        <p>{item.description} </p>

        <div className='price_div'>
          <div>
            <h5>"1"</h5> <span>0.00</span>{' '}
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
