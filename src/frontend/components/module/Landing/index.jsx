import React from "react"
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';    
import './index.scss'
import Home from "../Home";
import Header from "../Navbar";
function Landing( { market, nft, wallet, account }) {
const [openModel, setOpenModel] = React.useState(false);

const handleClose = (e) => {
    e.stopPropagation();
    setOpenModel(false);
}

  const handleScroll = () => {
    window.scrollTo({
      top: 700,
      behavior: "smooth"
    });
  }
  const Input = styled('input')({
    display: 'none',
  });
  
  React.useEffect(() => {

  }, [])

    return (
        <>
          <Header wallet={wallet} account={account} />
        <div>
     
        <div className="landing_container">
            <div className="content">
                <h1>
                    Discover, Collect, & Sell Awesome <span>NFTs</span>
                </h1>
                {/* <h1>Awesome <span>NFTs</span></h1> */}
                <p>World’s fast growing NFTs bazar based in
                    India</p>

              
                    <Button onClick={handleScroll} variant="outlined" className='explore_btn' >
                        Explore
                    </Button>
                    <Button onClick={()=> setOpenModel(true)} variant="outlined" className='create_btn'>
                        Create
                    </Button>
                
            </div>
            <div className="landing_wallpaper">   
                <div>
                    <img src="./spidy.png" alt="spidy" />
                </div>
            </div>
        </div>
       <div>
       <Home market={market} nft={nft} />
       </div>
          {
            openModel && <div className="create_nft_model">
                    <div>

                    <Paper className="paper" >
                        
                        <div className="paper_div">
                        <CloseIcon className="close_icon" onClick={handleClose} />
                        <TextField className="input_field" id="outlined-basic" label="Name" variant="outlined" />
                        <TextField className="input_field"  id="outlined-basic" type='number' label="Price" variant="outlined" />
                        <TextField className="input_field" id="outlined-multiline-static" multiline
                          rows={4} label="Description" variant="outlined" />
                        <label htmlFor="contained-button-file">
                        <Input accept="image/*" id="contained-button-file" type="file"/>
                        <Button className="upload_btn" variant="contained" component="span">Upload </Button>
                              </label>
                              <Button className="create_btn" variant="contained" component="span">Create </Button> 
                        </div>
                         </Paper>
                    </div>
                 </div>
          }
       
        </div>
        </>
    )
}
export default Landing;