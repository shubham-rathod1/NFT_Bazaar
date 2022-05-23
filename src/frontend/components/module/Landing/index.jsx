import React from "react"
import Button from '@mui/material/Button';
import './index.scss'
function Landing() {
  const handleScroll = () => {
    window.scrollTo({
      top: 700,
      behavior: "smooth"
    });
  }
    return (
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
                    <Button variant="outlined" className='create_btn'>
                        Create
                    </Button>
                
            </div>
            <div className="landing_wallpaper">   
                <div>
                    <img src="./spidy.png" alt="spidy" />
                </div>
            </div>
        </div>

    )
}
export default Landing;