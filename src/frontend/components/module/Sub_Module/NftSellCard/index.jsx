import React from 'react';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Avatar from '@mui/material/Avatar';
import './index.scss';
import { ethers } from 'ethers';
function NftSellCard({ item, buy }) {
  const [placed, setPlaced] = React.useState(false);
  const [price, setPrice] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [placedInMarket , setPlacedInMarket] = React.useState(false);
  console.log('item', item);

  const sellNFT = async () => {
     if(placed && price && !placedInMarket){
        setPlaced(false);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setPlacedInMarket(true);
            setPrice('');
        }, 2000);
     } else if(placed) {
       setPlaced(false);
       setPlacedInMarket(false);
     } else {
      setPlaced(true);
      setPlacedInMarket(false);
     }

  }
  return (
    <div className='nft_sell_card_container'>
      <div className='img_div'>
        <img src='spidy.png' alt='nft' />
      </div>
      <div className='info_div'>
        <div className='title'>
          <h3> Spidy </h3> <span>   <Avatar
        sx={{ border: '1px solid lightgray', bgcolor: 'white' }}
        alt="Remy Sharp"
      >
        <PersonOutlineIcon className='wallet_icon' wallet_icon />
      </Avatar> </span>
        </div>
        <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor recusandae iure labore sequi quam beatae iste, in itaque. Tenetur impedit vitae repudiandae fugiat cum modi eos alias magnam possimus dolorem? </p>

        <div className='price_div'>
          {/* <div>
            <h5>Current Price</h5> <span>0.00</span>{' '}
            <span>ETH</span>
          </div> */}
          <div className='input_div'>
            <LoadingButton
            loading={loading}
            loadingPosition="start"
              onClick={() => sellNFT()}
              variant='outlined'
              className={`sell_btn ${placed ? 'placed' : ''} ${placedInMarket ? 'placed_in_market' : ''}`}

            >
              { placed? 'PLACE': `${loading? 'Loading': placedInMarket? 'Placed in Market': 'Sell'}`}
            </LoadingButton>
            <input value={price} type='number' onChange={(e)=> setPrice(e.target.value)} className={`input ${placed ? 'placed_input' : ''}`} placeholder='Enter Price in Eth' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NftSellCard;
