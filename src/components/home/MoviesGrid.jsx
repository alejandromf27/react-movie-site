import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

/**
 * function to create the grid of movies to render
 * @param {props} passing properties  
 */
export function MoviesGrid(props) {

    // grid of movies
    const movies = props.searchResult ? props.searchResult
        .filter((movie) => {
            return props.ratingFilter == null
                || (movie.rating <= props.ratingFilter && movie.rating >= props.ratingFilter - 2);
        })
        .map((movie, index) => {
            return (
                <div className="col-12 col-sm-6 col-md-3 col-lg-2 mb-4" key={index}>
                    <div className="card" style={{ background: 'black' }}>
                        <Link to={`/movie/${movie.id}`}>
                            <img
                                style={{ height: '27rem', width: '20rem' }}
                                className="img-fluid"
                                onError={(e) => { e.target.src = require('../../logo.svg') }}
                                src={movie.poster}
                                alt={movie.title}
                            ></img>
                        </Link>
                    </div>
                    <div className="mt-3">
                        <ReactStars
                            count={10}
                            value={movie.rating}
                            edit={false}
                            half={false}
                            size={20}
                            color1={'#565656'}
                        ></ReactStars>
                        <p>{movie.title} ({movie.year})</p>
                    </div>
                </div>
            );
        }) : [];

    /**
     * render the movies grid 
     */
    return (
        <div className="col-12 pt-0 pl-5 pr-4 row">{movies}</div>
    );
}