import React from "react";
import Button from '@mui/material/Button';
import './index.scss'
function NftCard(){

    return(
        <div className="nft_card_container">
         <div className="img_div">
             <img src="./spidy.png" alt="nft" />
         </div>
         <div className="info_div">
             <div className="title">
             <h3>Spidy  </h3> <span>#000000000</span>
             </div>
                <p>Spidy is a NFT that is a unique and rare bird. </p>

                <div className="price_div">
                    <div>
                    <h5>Current Price</h5> <span>0.00</span> <span>ETH</span>
                    </div>
                   <div>
                   <Button variant="outlined" className='buy_btn'>
                        BUY
                    </Button>
                   </div>
                </div>
         </div>
        </div>
    )
}

export default NftCard;