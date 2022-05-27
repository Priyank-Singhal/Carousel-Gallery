import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import json2mq from 'json2mq';
import useMediaQuery from '@mui/material/useMediaQuery';

import "../index.css";

export const CarouselItem = ({ children, width }) => {
    return (
        <div className="carousel-item" style={{ width: width, margin: '20px'}}>
            {children}
        </div>
    );
};

const Carousel = ({ children }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    const size = useMediaQuery(
        json2mq({
            minWidth: 900,
        }),
    );

    const pct = size ? 30 : 90 

    const updateIndex = (newIndex) => {
        if (newIndex < 0) {
            newIndex = size ? 5 : 6;
        } else if (newIndex >= 7) {
            newIndex = 0;
        }
        // console.log(React.Children.count(children))
        // console.log(newIndex)

        setActiveIndex(newIndex);
    };

    

    useEffect(() => {
        const interval = setInterval(() => {
            if (!paused) {
                updateIndex(activeIndex + 1);
            }
        }, 3000);

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    });

    const handlers = useSwipeable({
        onSwipedLeft: () => updateIndex(activeIndex + 1),
        onSwipedRight: () => updateIndex(activeIndex - 1)
    });

    return (
        <div
            {...handlers}
            className="carousel"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <div
                className="inner"
                style={{ transform: `translateX(-${activeIndex * pct}%)` }}
            >
                {React.Children.map(children, (child, index) => {
                    return React.cloneElement(child, { width: "inherit" });
                })}
            </div>
            <div className="indicators">
                <Button
                    onClick={() => {
                        updateIndex(activeIndex - 1);
                    }}>
                    <ArrowBackIosIcon />
                </Button>
                <Button
                    onClick={() => {
                        updateIndex(activeIndex + 1);
                    }}>
                    <ArrowForwardIosIcon />
                </Button>
            </div>
        </div>
    );
};

export default Carousel;
