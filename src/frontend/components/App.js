import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';

//local imports
import BazaarAddress from '../contractsData/Bazaar-address.json';
import BazaarAbi from '../contractsData/Bazaar.json';
import NftAddress from '../contractsData/MyNft-address.json';
import NftAbi from '../contractsData/MyNft.json';
import Header from './module/Navbar';
import Router from './Routes';

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
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    //get signer of connected account from provider
    const signer = provider.getSigner();
    getContract(signer);
  };

  const getContract = async (signer) => {
    setLoading(true);
    // fetch deployed copies here
    const bazaar = new ethers.Contract(
      BazaarAddress.address,
      BazaarAbi.abi,
      signer
    );
    setBazaar(bazaar);
    const nft = new ethers.Contract(NftAddress.address, NftAbi.abi, signer);
    setNft(nft);
    setLoading(false);
  };
  return (
    <div>
      <Header wallet={walletConnect} account={account} />

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
