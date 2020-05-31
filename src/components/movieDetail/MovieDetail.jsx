import React, { useState, useEffect } from "react";
import { getMovieDetail } from "../../service";
import ReactStars from 'react-rating-stars-component'
import './MovieDetail.css'

/**
 * Movie detail component
 * @param {props} properties 
 */
export function MovieDetail(props) {
  let params = props.match.params;
  let generesList;
  const [detail, setDetail] = useState([]);

  /**
   * hook to get te movie detail when the id change
   */
  useEffect(() => {
    const getDetail = async () => {
      setDetail(await getMovieDetail(params.id));
    };

    getDetail();
  }, [params.id]);

  /**
   * back to the last page
   */
  const back = () => {
    props.history.goBack();
  }

  // verify if there are genres of this movie
  if (detail && detail.genres) {
    generesList = detail.genres.map((genre, index) => {
      return (
        <li className="list-inline-item" key={index}>
          <button type="button" className="btn btn-outline-info">
            {genre.name}
          </button>
        </li>
      );
    });
  }

  /**
   * render the detail of the movie
   */
  return (
    <div className="row m-0 vertical-center" style={{
      background: `linear-gradient(
      to bottom,
      rgba(0,0,0, 0.7),
      rgba(0,0,0, 1)
    ),url(${detail.backdrop})`
    }}>
      <div className="col-5">
        <div className="col text-center" style={{ width: "100%" }}>
          <img
            className="img-fluid"
            // style={{ height: '100vh' }}
            src={detail.poster}
            onError={(e) => { e.target.src = require('../../logo.svg') }}
            alt={detail.title}
          ></img>
        </div>
      </div>
      <div className="col-7">

        <h1>{detail.title} ({detail.year})</h1>

        <div className="row mt-4">
          <div className="col">
            <ul className="list-inline">{generesList}</ul>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col">
            <span className="text-secondary" >Rating</span>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <ReactStars
              count={10}
              value={detail.rating}
              edit={false}
              half={false}
              size={20}
              color1={'#565656'}
            ></ReactStars>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col">
            <span className="text-secondary" >Overview</span>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <p>{detail.overview}</p>
          </div>
        </div>
      </div>
      <div className="text-secondary close-icon" onClick={back}>X</div>
    </div>
  );
};
