import React, { useContext, useState } from 'react';
import AppContext from '../../context/app-context.js'
import { StarRating } from "../starRating/StarRating";

/**
 * component to use in the navbar (search , rating filter)
 * @param {handleSearchInput} value to search
 * @param {handleRatingFilter}  rating to filter
 */
export function NavBar({ handleSearchInput, handleRatingFilter }) {

    // use the hooks useContext, useState
    const context = useContext(AppContext);
    const [value, setValue] = useState(context.searched);

    /**
     * render the elements of the navbar
     */
    return (
        <div className="navbar ">
            <div className="col-6 row d-none d-sm-flex">
                <img className="mt-2" width={'60rem'} alt="Logo"
                    src={'https://www.themoviedb.org/assets/1/v4/logos/primary-green-d70eebe18a5eb5b166d5c1ef0796715b8d1a2cbc698f96d311d62f894ae87085.svg'}></img>
                <div className="">
                    <small className="ml-2" style={{ position: 'absolute', bottom: '2rem' }}>ReactJS</small>
                    <h3 className="text-muted font-weight-bolder mb-0 ml-1 mt-4">CHALLENGE</h3>
                </div>
            </div>
            <div className="input-group col-md-6 col-sm-12  mt-3 mr-4">
                <input className="col-10 form-control mr-4 mt-2" type="text" value={value} onChange={e => setValue(e.target.value)}
                    onKeyUp={handleSearchInput} placeholder="Search for your favorite movie..."
                    style={{ backgroundColor: '#474747', border: 'none', color: 'beige', borderRadius: '10px' }} />
                <StarRating handleRatingChange={handleRatingFilter} />
            </div>
        </div>
    );
}