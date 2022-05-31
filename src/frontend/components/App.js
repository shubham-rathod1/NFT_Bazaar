import './App.css';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

//local imports
import BazaarAddress from '../contractsData/Bazaar-address.json';
import BazaarAbi from '../contractsData/Bazaar.json';
import NftAddress from '../contractsData/MyNft-address.json';
import NftAbi from '../contractsData/MyNft.json';
import Header from './module/Navbar';
import Router from './Routes';
import Landing from './module/Landing';
import NftCard from './module/Sub_Module/NftCard';
import Home from './module/Home';

function App() {
  const [account, setAccount] = useState(null);
  const [Nft, setNft] = useState({});
  const [Bazaar, setBazaar] = useState({});
  const [loading, setLoading] = useState(false);

  //get chosen account from metamask wallet
  
  const walletConnect = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    setAccount(accounts[0]);
    //get signer of connected account from provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    // getsiner is private key instance needed to sign transaction
    getContract(signer);
  };

  const getContract = async (signer) => {
    //console.log('this is signer', signer);
    setLoading(true);
    // fetch deployed copies here
  //  console.log('bazar', BazaarAddress.address);
    const bazaar = new ethers.Contract(
      BazaarAddress.address,
      BazaarAbi.abi,
      signer
    );
    console.log(bazaar);
    setBazaar(bazaar);
    const nft = new ethers.Contract(NftAddress.address, NftAbi.abi, signer);
    setNft(nft);
    setLoading(false);
    //console.log('this is from app', bazaar, nft);
  };

  return (
    <div className='App'>
      {loading ? (
        'loading'
      ) : (
        <div className=''>
          <Router
            market={Bazaar}
            nft={Nft}
            account={account}
            wallet={walletConnect}
          />
        </div>
      )}
    </div>
  );
}

export default App;
