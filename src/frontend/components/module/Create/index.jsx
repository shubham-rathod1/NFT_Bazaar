import React, { useState } from 'react';
import { ethers } from 'ethers';
import { create as ipfsHttpClient } from 'ipfs-http-client';
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

export default function Create({ market, nft }) {
  const [image, setImage] = useState('');
  const [price, setPrice] = useState(undefined);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const upload = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (typeof file !== 'undefined') {
      try {
        const result = await client.add(file);
        console.log(result);
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
    console.log('s_nftid', nft);
    const id = await nft.s_nftId();
    //approve market to spend this nft;
    await (await nft.setApprovalForAll(market.address, true)).wait();
    // add nft to market;
    const listPrice = ethers.utils.parseEther(price.toString(10));
    await (await market.createItem(nft.address, id, listPrice)).wait();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createNft();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <form onSubmit={handleSubmit}>
          <input type='file' name='file' onChange={upload} />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='name'
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='description'
          />
          <input
            // type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder='price'
          />
          <input type='submit' value='create' />
        </form>
      </div>
    </div>
  );
}
