import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import './index.scss';
import Home from '../Home';
import Header from '../Navbar';
import { ethers } from 'ethers';
import { create as ipfsHttpClient } from 'ipfs-http-client';
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

function Landing({ market, nft, wallet, account }) {
  const [openModel, setOpenModel] = React.useState(false);
  const [image, setImage] = useState('');
  const [price, setPrice] = useState(undefined);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const upload = async (file) => {
    console.log(file);
    if (typeof file !== 'undefined') {
      try {
        const result = await client.add(file);
        setImage(`https://ipfs.infura.io/ipfs/${result.path}`);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const createNft = async () => {
    try {
      const result = await client.add(
        JSON.stringify({ image, price, name, description })
      );
      mint(result);
    } catch (error) {
      console.log(error);
    }
  };
  const mint = async (result) => {
    const uri = `https://ipfs.infura.io/ipfs/${result.path}`;
    await (await nft.mintNft(uri)).wait();
    const id = await nft.s_nftId();
    //approve market to spend this nft;
    await (await nft.setApprovalForAll(market.address, true)).wait();
    // add nft to market;
    const listPrice = ethers.utils.parseEther(price.toString());
    await (await market.createItem(nft.address, id, listPrice)).wait();
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setOpenModel(false);
  };

  const handleScroll = () => {
    window.scrollTo({
      top: 700,
      behavior: 'smooth',
    });
  };
  const Input = styled('input')({
    display: 'none',
  });

  React.useEffect(() => {}, []);
  const handleImage = (e) => {
    const file = e.target.files[0];
    upload(file);
  };

  return (
    <>
      <Header wallet={wallet} account={account} />
      <div>
        <div className='landing_container'>
          <div className='content'>
            <h1>
              Discover, Collect, & Sell Awesome <span>NFTs</span>
            </h1>
            <p>World’s fast growing NFTs bazar based in India</p>

            <Button
              onClick={handleScroll}
              variant='outlined'
              className='explore_btn'
            >
              Explore
            </Button>
            <Button
              onClick={() => setOpenModel(true)}
              variant='outlined'
              className='create_btn'
            >
              Create
            </Button>
          </div>
          <div className='landing_wallpaper'>
            <div>
              <img src='./spidy.png' alt='spidy' />
            </div>
          </div>
        </div>
        <div>
          <Home market={market} nft={nft} />
        </div>
        {openModel && (
          <div className='create_nft_model'>
            <div>
              <Paper className='paper'>
                <div className='paper_div'>
                  <CloseIcon className='close_icon' onClick={handleClose} />
                  <TextField
                    className='input_field'
                    id='outlined-basic'
                    label='Name'
                    variant='outlined'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <TextField
                    className='input_field'
                    id='outlined-basic'
                    type='number'
                    label='Price'
                    variant='outlined'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <TextField
                    className='input_field'
                    id='outlined-multiline-static'
                    multiline
                    rows={4}
                    label='Description'
                    variant='outlined'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <Button
                    className='upload_btn'
                    variant='contained'
                    component='label'
                  >
                    <Input
                      accept='image/x-png,image/gif,image/jpeg,image/bmp'
                      id='contained-button-file'
                      type='file'
                      onChange={(e) => handleImage(e)}
                    />
                    Upload{' '}
                  </Button>
                  <Button
                    onClick={createNft}
                    className='create_btn'
                    variant='contained'
                    component='span'
                  >
                    Create{' '}
                  </Button>
                </div>
              </Paper>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default Landing;
