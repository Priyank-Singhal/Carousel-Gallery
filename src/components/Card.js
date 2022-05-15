import React, { useContext } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Avatar from '@mui/material/Avatar';
import { ImageDataContext } from '../context/ImageDataContext';
import { Box } from '@mui/system';
import DownloadIcon from '@mui/icons-material/Download';
import { CardActions } from '@mui/material';
import createTheme from '@mui/material/styles/createTheme';


export default function RecipeReviewCard() {

    const { data } = useContext(ImageDataContext)
    const result = data.results;
    // console.log('This is from cards', result)

    return (
        <Box sx={{ display: 'flex' }}>
            {/* {result && result.map(card => (
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        component="img"
                        height="194"
                        // image={data.results ? data.results[0].urls.full : null}
                        image={card.urls.full}
                        alt="Paella dish"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {card.user.first_name} {card.user.last_name}
                        </Typography>
                        <IconButton aria-label="add to favorites" sx={{fontSize: '1.2rem'}}>
                            <FavoriteIcon />{card.likes}
                        </IconButton>
                    </CardContent>
                    <CardActions>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                    </CardActions>
                </Card>
            ))} */}

            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    height="300"
                    image={data.results ? data.results[0].urls.full : null}
                    // image={card.urls.full}
                    alt="Paella dish"
                />
                <CardContent sx={{ display: 'flex', backgroundImage: data.results ? data.results[0].urls.full : null, background: 'transparent' }}>
                    <Avatar sx={{ bgcolor: 'red', marginRight: '0.5rem' }} aria-label="recipe">
                        R
                    </Avatar>
                    <div>
                        <Typography variant="body2" color="text.secondary">
                            {data.results && data.results[0].user.first_name} {data.results && data.results[0].user.last_name}
                        </Typography>
                        <IconButton aria-label="add to favorites" sx={{ fontSize: '1rem', marginLeft: '-0.7rem', marginTop: '-0.5rem' }}>
                            <FavoriteIcon fontSize='small' />{data.results && data.results[0].likes}
                        </IconButton>
                    </div>
                    <IconButton aria-label="share" sx={{ marginLeft: 'auto' }}>
                        <DownloadIcon sx={{ marginLeft: 'auto' }} />
                    </IconButton>
                </CardContent>
            </Card>
        </Box>
    );
}
