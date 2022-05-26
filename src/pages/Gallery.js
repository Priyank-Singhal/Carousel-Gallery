import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Button, Container, CssBaseline, Typography } from '@mui/material';
import { Box } from '@mui/system';
import ShuffleTwoToneIcon from '@mui/icons-material/ShuffleTwoTone';
import Card from '../components/Card'
import axios from 'axios';
import { ImageDataContext } from '../context/ImageDataContext';
import Carousel, { CarouselItem } from '../components/Carousel';

const theme = createTheme({
});

const Gallery = () => {


    const topics = ['coding', 'travel', 'nature', 'tech', 'water', 'forest', 'beach']
    const [topic, setTopic] = useState();
    const [data, setData] = useState({})

    const handleShuffle = () => {
        const rand = Math.floor(0 + Math.random() * (6 - 0))
        setTopic(prevVal => {
            if (topics[rand] === prevVal) return 'fruits'
            else return topics[rand]
        })
        console.log(topic)
    }


    useEffect(() => {
        axios.get('https://api.unsplash.com/search/photos?page=1&query=' + topic + '&client_id=6i3h31X3KB7XH4qqwfurMmq5TKuSgWJcgOKyfBzs1_0')
            .then(res => {
                setData(res.data)
                // console.log(res.data.results)
            })
            .catch(err => {
                console.log('Error: ', err.message)
            })
    }, [topic])

    return (
        <div className='gallery'>
            <ThemeProvider theme={theme}>
                <Container component='main' maxWidth='md' sx={{ background: '' }}>
                    <CssBaseline />
                    <Box
                        maxWidth='sm'
                        sx={{
                            marginTop: '15%',
                            background: '',
                            display: 'flex'
                        }}
                    >
                        <Typography variant='h4' sx={{ fontSize: 42 }}>Gallery</Typography>
                        <Button
                            variant='contained'
                            sx={{ marginLeft: 'auto' }}
                            onClick={handleShuffle}
                        >
                            Shuffle<ShuffleTwoToneIcon />
                        </Button>
                    </Box>
                    <Box
                        maxWidth='sm'
                        sx={{
                            marginTop: '15%',
                            background: '',
                            display: 'flex'
                        }}
                    >
                        <ImageDataContext.Provider value={{ data }}>
                            <Carousel>
                                {/* <CarouselItem>Item 1</CarouselItem>
                                <CarouselItem>Item 2</CarouselItem>
                                <CarouselItem>Item 3</CarouselItem> */}
                                <Card />
                            </Carousel>
                        </ImageDataContext.Provider>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    )
}

export default Gallery