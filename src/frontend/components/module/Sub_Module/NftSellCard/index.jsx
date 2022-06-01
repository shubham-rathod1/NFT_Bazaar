import React from 'react';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Avatar from '@mui/material/Avatar';
import './index.scss';
import { ethers } from 'ethers';
function NftSellCard({ item, market }) {
  const [placed, setPlaced] = React.useState(false);
  const [price, setPrice] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [placedInMarket, setPlacedInMarket] = React.useState(false);
  //console.log('item', item);

  const sellNFT = async () => {
    if (placed && price && !placedInMarket) {
      setPlaced(false);
      setLoading(true);
      handleSell();
      // setTimeout(() => {
      //   setLoading(false);
      //  // setPlacedInMarket(true);
      //   // setPrice('');
      // }, 2000);
    } else if (placed) {
      setPlaced(false);
      setPlacedInMarket(false);
    } else {
      setPlaced(true);
      setPlacedInMarket(false);
    }
  };
  // const handleSell = (item) => {
  //   let payload = {
  //     ...item,
  //     price,
  //   };
  // };

  const handleSell = async () => {
    //console.log(item);
    const listPrice = ethers.utils.parseEther(price.toString());
    console.log('listPrice', item.nft, item.itemId, listPrice);
    await (await market.createItem(item.nft, item.itemId, listPrice)).wait();
    setLoading(false);
    setPlacedInMarket(true);
    setPrice('');
  };

  return (
    <div className='nft_sell_card_container'>
      <div className='img_div'>
        <img src={item.image} alt='nft' />
      </div>
      <div className='info_div'>
        <div className='title'>
          <h3> {item.name} </h3>{' '}
          <span>
            {' '}
           <Tooltip title={item.seller} placement='left-start'>
            <Avatar
              sx={{ border: '1px solid lightgray', bgcolor: 'white' }}
              alt='Remy Sharp'
            >
              <PersonOutlineIcon className='wallet_icon' wallet_icon />
            </Avatar>{' '}
          </Tooltip>
          </span>
        </div>
        <p> {item.description} </p>

        <div className='price_div'>
          {/* <div>
            <h5>{item.price && ethers.utils.formatEther(item.price)}</h5>{' '}
            <span>0.00</span> <span>ETH</span>
          </div> */}
          <div className='input_div'>
            <LoadingButton
              loading={loading}
              loadingPosition='start'
              onClick={()=>sellNFT()}
              variant='outlined'
              className={`sell_btn ${placed ? 'placed' : ''} ${
                placedInMarket ? 'placed_in_market' : ''
              }`}
            >
              {placed
                ? 'PLACE'
                : `${
                    loading
                      ? 'Loading'
                      : placedInMarket
                      ? 'Placed in Market'
                      : 'Sell'
                  }`}
            </LoadingButton>
            <input
              value={price}
              type='number'
              onChange={(e) => setPrice(e.target.value)}
              className={`input ${placed ? 'placed_input' : ''}`}
              placeholder='Enter Price in Eth'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NftSellCard;
