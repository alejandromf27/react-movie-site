import React from "react";

/**
 * create the global context
 */
export default React.createContext({
  ratingFilter: null,
  searched: "",

  setSearched: searched => {},
  setRatingFilter: ratingFilter => {}
});
