import React from "react";
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import { Grid } from '@mui/material';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import StoreIcon from '@mui/icons-material/Store';
import NftCard from '../Sub_Module/NftCard';
import './index.scss';
import NftSellCard from "../Sub_Module/NftSellCard";
const drawerWidth = 240;
function Dashboard() {

    const itemArray = [1,2,3,4.5,6,7,8]
    const buyNft = () => {

    }
    return(
        <div className="dashboard_container">
            <div>
             <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
           <Toolbar > 
               <h3>DASHBOARD</h3>
           </Toolbar>
        <Divider />
    <List>
          {[{text:'My NFTs', icon: <StoreIcon/> } , ].map((item, index) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      </div>
      <div>
      <Grid container spacing={2}>
              {itemArray.map((item, id) => (
                <Grid item sm={3}>
                  <div>
                    <NftSellCard item={item} buy={buyNft} />
                  </div>
                </Grid>
              ))}
            </Grid>
      </div>
        </div>
    )
}

export default Dashboard;