import React, { useEffect, useState, useContext } from 'react';
import AppContext from '../../context/app-context.js';
import './starRating.css';

/**
 * Filter by rating component
 * @param {handleRatingChange} rating change 
 */
export function StarRating({ handleRatingChange }) {
    const context = useContext(AppContext);
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    /**
     * set the rating if the filter change
     */
    useEffect(() => {
        setRating(context.ratingFilter / 2);
        handleRatingChange(context.ratingFilter ? context.ratingFilter : null);
    }, [context.ratingFilter, handleRatingChange])

    /**
     * Change the rating or clear the filter
     * @param {ratingValue} rating value 
     */
    const onRatingChanged = (ratingValue) => {
        if (ratingValue === rating) {
            setRating(null);
            handleRatingChange(null);
        } else {
            setRating(ratingValue);
            handleRatingChange(ratingValue * 2);
        }
    }

    /**
     * prepare the the stars for the rating filter
     */
    const starList = [...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return <li className="list-inline-item" key={ratingValue}
            onClick={() => onRatingChanged(ratingValue)}>
            <span style={{ color: ratingValue <= (hover || rating) ? '#ffc107' : '#565656' }}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}>&#9733;</span>
        </li>
    });

    /**
     * render the component
     */
    return (
        <div>
            <span className="small font-italic ml-2">Filter by rating</span>
            <ul className="list-inline" style={{ marginTop: '-1em !important' }}>{starList}</ul>
        </div>
    );
};
