import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ethers } from 'ethers';

export default function Cards({ item, buy }) {
  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardMedia
        component='img'
        height='300'
        image={item.image}
        alt='green iguana'
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          sr.{item.itemId.toNumber()} - {item.name}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {item.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Typography variant='body2' color='text.secondary'>
          price:- {ethers.utils.formatEther(item.price)}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          seller:- {`${item.seller.split('').splice(0, 20).join('')}...`}
        </Typography>
        <Button
          sx={{ marginLeft: '20px', backgroundColor:"teal" }}
          variant='contained'
          onClick={() => buy(item)}
        >
          Buy
        </Button>
      </CardActions>
    </Card>
  );
}
