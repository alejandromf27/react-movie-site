import React, { useState } from 'react';
import AppContext from './app-context.js';

/**
 * Manage the context
 * @param {props} properties of the context 
 */
const GlobalState = props => {

  const [searched, setSearched] = useState("");
  const [ratingFilter, setRatingFilter] = useState(null);

  return (
    <AppContext.Provider
      value={{
        searched: searched,
        ratingFilter: ratingFilter,
        setSearched: setSearched,
        setRatingFilter: setRatingFilter
      }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default GlobalState;