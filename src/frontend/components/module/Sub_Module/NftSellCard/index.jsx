import React from 'react';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Avatar from '@mui/material/Avatar';
import './index.scss';
import { ethers } from 'ethers';
function NftSellCard({ item, market, nft }) {
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

  const handleSell = async () => {
    const listPrice = ethers.utils.parseEther(price.toString());
    console.log('sell item', item);
    await (await nft.setApprovalForAll(market.address, true)).wait();
    await (await market.createItem(nft.address, item.nftId, listPrice)).wait();
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
        <p> {item.description} </p>

        <div className='price_div'>
          <div className='input_div'>
            <LoadingButton
              loading={loading}
              loadingPosition='start'
              onClick={() => sellNFT()}
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
