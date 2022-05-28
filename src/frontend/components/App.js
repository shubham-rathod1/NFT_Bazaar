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
  // const [signer, setSigner] = useState(undefined);
  const [Nft, setNft] = useState({});
  const [Bazaar, setBazaar] = useState({});
  const [loading, setLoading] = useState(false);

  //get chosen account from metamask wallet
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const walletConnect = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    setAccount(accounts[0]);
    //get signer of connected account from provider
    const signer = provider.getSigner();
    getContract(signer);
  };

  const getContract = async () => {
    setLoading(true);
    // fetch deployed copies here
    const bazaar = new ethers.Contract(
      BazaarAddress.address,
      BazaarAbi.abi,
      provider
    );
    setBazaar(bazaar);
    const nft = new ethers.Contract(NftAddress.address, NftAbi.abi, provider);
    setNft(nft);
    setLoading(false);
    console.log('this is from app', bazaar, nft);
  };

  useEffect(() => {
    getContract();
  }, []);

  return (
    <div className='App'>
      <Header wallet={walletConnect} account={account} />
      <Landing />
      {/* <NftCard/> */}
      {/* <Home /> */}
      {loading ? (
        'loading'
      ) : (
        <div className='container-fluid mt-5'>
          <Router market={Bazaar} nft={Nft} account={account} />
        </div>
      )}
    </div>
  );
}

export default App;
