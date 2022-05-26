import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import "../index.css";

export const CarouselItem = ({ children, width }) => {
    return (
        <div className="carousel-item" style={{ width: width }}>
            {children}
        </div>
    );
};

const Carousel = ({ children }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    const updateIndex = (newIndex) => {
        if (newIndex < 0) {
            newIndex = 5;
        } else if (newIndex >= 6) {
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
                style={{ transform: `translateX(-${activeIndex * 50}%)` }}
            >
                {React.Children.map(children, (child, index) => {
                    return React.cloneElement(child, { width: "25vw" });
                })}
            </div>
            <div className="indicators">
                <Button
                    onClick={() => {
                        updateIndex(activeIndex - 1);
                    }}>
                    <ArrowBackIosIcon />
                </Button>
                {/* {React.Children.map(children, (child, index) => {
                    return (
                        <button
                            className={`${index === activeIndex ? "active" : ""}`}
                            onClick={() => {
                                updateIndex(index);
                            }}
                        >
                            {index + 1}
                        </button>
                    );
                })} */}
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
