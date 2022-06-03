import './App.css';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

//local imports
import BazaarAddress from '../contractsData/Bazaar-address.json';
import BazaarAbi from '../contractsData/Bazaar.json';
import NftAddress from '../contractsData/MyNft-address.json';
import NftAbi from '../contractsData/MyNft.json';
// import Header from './module/Navbar';
import Router from './Routes';
// import Landing from './module/Landing';
// import NftCard from './module/Sub_Module/NftCard';
// import Home from './module/Home';

function App() {
  const [account, setAccount] = useState(null);
  const [Nft, setNft] = useState({});
  const [Bazaar, setBazaar] = useState({});
  const [loading, setLoading] = useState(false);
  const [signer, setSigner] = useState(null);
  //get chosen account from metamask wallet
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const walletConnect = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    setAccount(accounts[0]);
    //get signer of connected account from provider
    const signer = await provider.getSigner();
    // getsiner is private key instance needed to sign transaction
    console.log('signer', signer);
    setSigner(signer);
  };

  const getContract = async () => {
    //console.log('this is signer', signer);
    setLoading(true);
    // fetch deployed copies here
    const accounts = await window.ethereum.request({
      method: 'eth_accounts',
    });
    setAccount(accounts[0]);
    const signer = await provider.getSigner();

    // getsiner is private key instance needed to sign transaction
    setSigner(signer);
    const bazaar = new ethers.Contract(
      BazaarAddress.address,
      BazaarAbi.abi,
      signer || provider
    );
    setBazaar(bazaar);
    const nft = new ethers.Contract(
      NftAddress.address,
      NftAbi.abi,
      signer || provider
    );
    setNft(nft);
    setLoading(false);
  };

  useEffect(() => {
    getContract();
  }, []);

  return (
    <>
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
    </>
  );
}

export default App;
