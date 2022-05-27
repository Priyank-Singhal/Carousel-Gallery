import React, { useContext } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import { ImageDataContext } from '../context/ImageDataContext';
import { Box } from '@mui/system';
import DownloadIcon from '@mui/icons-material/Download';
import createTheme from '@mui/material/styles/createTheme';
import Carousel, { CarouselItem } from '../components/Carousel';
import Skeleton from '@mui/material/Skeleton';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
})

export default function RecipeReviewCard() {

    const { data, load } = useContext(ImageDataContext)
    const result = data.results;
    // console.log('This is from cards', result[0])

    return (
        <Box sx={{ display: 'flex' }}>
            <Carousel>
                {result && result.map((card, index) => (
                    <CarouselItem key={index}>
                        {
                            load ?
                                <Skeleton variant="rectangular" width={300} height={400} />
                                :
                                <Card sx={{ maxWidth: 345, minWidth: 200 }} elevation={20}>
                                    <CardMedia
                                        component="img"
                                        height="400"
                                        image={card ? card.urls.full : null}
                                        // image={card.urls.full}
                                        alt="Paella dish"
                                    />
                                    <CardContent sx={{ display: 'flex', position: 'relative', background: 'linear-gradient(rgba(220,220,220,0), rgba(0,0,0,0.9))', marginTop: '-5rem', color: 'white' }}>
                                            <Avatar sx={{ marginRight: '0.5rem' }} aria-label="recipe" src={card.user.profile_image.large}>
                                                R
                                            </Avatar>
                                        <Box sx={{ marginBottom: '-2rem' }}>
                                            <Typography variant="body2" >
                                                {card && card.user.first_name} {card && card.user.last_name}
                                            </Typography>
                                            <FavoriteIcon fontSize='inherit' sx={{ marginTop: '0.1rem', position: 'relative' }} /> {card && card.likes}
                                        </Box>
                                        {/* <a href={card.urls.full} download="img.png">some link</a> */}
                                        {/* <IconButton aria-label="share" sx={{ marginLeft: 'auto' }} theme={darkTheme} onClick={()=>fetch(card.links.download+'&force=true')}> */}
                                        <IconButton aria-label="share" sx={{ marginLeft: 'auto' }} theme={darkTheme}>
                                            <Link
                                                href={card ? card.links.download + '&force=true' : null}
                                                sx={{ textDecoration: 'none', color: 'white' }}
                                            >
                                                <DownloadIcon />
                                            </Link>
                                        </IconButton>
                                    </CardContent>
                                </Card>
                        }
                    </CarouselItem>
                ))}
            </Carousel>

            {/* <Card sx={{ maxWidth: 345 }} elevation={20}>
                <CardMedia
                    component="img"
                    height="400"
                    image={data.results ? data.results[0].urls.full : null}
                    // image={card.urls.full}
                    alt="Paella dish"
                />
                <CardContent sx={{ display: 'flex', position: 'relative', background: 'linear-gradient(rgba(220,220,220,0), rgba(0,0,0,0.9))', marginTop: '-5rem', color: 'white' }}>
                    <Avatar sx={{ bgcolor: 'red', marginRight: '0.5rem' }} aria-label="recipe">
                        R
                    </Avatar>
                    <Box sx={{ marginBottom: '-2rem' }}>
                        <Typography variant="body2" >
                            {data.results && data.results[0].user.first_name} {data.results && data.results[0].user.last_name}
                        </Typography>
                        <FavoriteIcon fontSize='inherit' sx={{ marginTop: '0.1rem', position: 'relative' }} /> {data.results && data.results[0].likes}
                    </Box>
                    <a href={data.results[0].urls.full} download="img.png">some link</a>
                    <IconButton aria-label="share" sx={{ marginLeft: 'auto' }} theme={darkTheme} onClick={()=>fetch(data.results[0].links.download+'&force=true')}>
                    <IconButton aria-label="share" sx={{ marginLeft: 'auto' }} theme={darkTheme}>
                        <Link
                            href={data.results ? data.results[0].links.download + '&force=true' : null}
                            sx={{ textDecoration: 'none', color: 'white' }}
                        >
                            <DownloadIcon />
                        </Link>
                    </IconButton>
                </CardContent>
            </Card> */}
        </Box>
    );
}
