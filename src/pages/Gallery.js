import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Button, Container, CssBaseline, Typography } from '@mui/material';
import { Box, padding } from '@mui/system';
import ShuffleTwoToneIcon from '@mui/icons-material/ShuffleTwoTone';
import Card from '../components/Card'
import axios from 'axios';
import { ImageDataContext } from '../context/ImageDataContext';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import json2mq from 'json2mq';
import useMediaQuery from '@mui/material/useMediaQuery';

const theme = createTheme({
});

const Gallery = () => {


    const topics = ['coding', 'travel', 'nature', 'tech', 'water', 'forest', 'beach']
    const [topic, setTopic] = useState();
    const [data, setData] = useState({})
    const [load, setLoad] = useState(true);

    const size = useMediaQuery(
        json2mq({
            minWidth: 900,
        }),
    );

    const handleShuffle = () => {
        setLoad(true)
        const rand = Math.floor(0 + Math.random() * (6 - 0))
        setTopic(prevVal => {
            if (topics[rand] === prevVal) return 'fruits'
            else return topics[rand]
        })

        console.log(topic)
    }

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            setLoad(true)
            setTopic(e.target.value)
            // e.target.value=''
        }
    }


    useEffect(() => {
        axios.get('https://api.unsplash.com/search/photos?page=1&query=' + topic + '&client_id=6i3h31X3KB7XH4qqwfurMmq5TKuSgWJcgOKyfBzs1_0')
            .then(res => {
                setData(res.data)
                // console.log(res.data.results)
                setTimeout(() => setLoad(false), 1000);
            })
            .catch(err => {
                console.log('Error: ', err.message)
            })
    }, [topic])

    return (
        <div className='gallery'>
            <ThemeProvider theme={theme}>
                <Container component='main' maxWidth='md' sx={{ background: '', marginLeft: '5%' }}>
                    <CssBaseline />
                    <Box
                        // maxWidth='lg'
                        sx={{
                            marginTop: '15%',
                            background: '',
                            display: `${size && 'flex'}`,
                            width: '60vw'
                        }}
                    >
                        <Typography variant='h4' sx={{ fontSize: 42 }}>Gallery</Typography>
                        <div style={{ marginLeft: '2rem', border: '1px solid black', borderRadius: '8px', padding: '2px', display: 'flex' }}>
                            <div style={{ marginLeft: '5%' }}>
                                <SearchIcon sx={{ marginTop: '45%' }} />
                            </div>
                            <InputBase placeholder='Search . . . ' sx={{ marginLeft: '5%' }}
                                onKeyDown={handleKeyPress}
                            />
                        </div>
                        <Button
                            variant='contained'
                            sx={{
                                marginLeft: `${size ? 'auto' : '2rem' }`,
                                marginTop: '1rem',
                                padding: '0.5rem 2rem'
                            }}
                            onClick={handleShuffle}
                        >
                            Shuffle<ShuffleTwoToneIcon />
                        </Button>
                    </Box>
                    <Box
                        maxWidth='sm'
                        sx={{
                            marginTop: '10%',
                            background: '',
                            display: 'flex',
                            flexDirection: 'row'
                        }}
                    >
                        <ImageDataContext.Provider value={{ data, load }}>
                            {/* <Carousel> */}
                            {/* <CarouselItem>Item 1</CarouselItem>
                                <CarouselItem>Item 2</CarouselItem>
                                <CarouselItem>Item 3</CarouselItem> */}
                            {/* </Carousel> */}
                            <Card />
                        </ImageDataContext.Provider>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    )
}

export default Gallery