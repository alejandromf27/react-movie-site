import React, { useEffect, useContext, useState } from "react";
import { getMovies, searchMovies } from "../../service";
import AppContext from '../../context/app-context.js';
import { NavBar } from "./NavBar";
import { MoviesGrid } from "./MoviesGrid";

/**
 * home function to render the navbar and the list of movies
 */
export function Home() {

  const context = useContext(AppContext); // use the context and its attr

  // use hook useState we need to control the state on the search
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  /**
   * function to get the movies list using the API
   */
  const getDiscover = async () => {
    setSearchResult(await getMovies());
  };

  /**
   * function to search movies by search using the API
   * @param {query} search value 
   */
  const getSearchResult = async (query) => {
    setSearchResult(await searchMovies(query));
  };

  /**
   * use the hook useEffect to control the search result when have sometime to search by context
   */
  useEffect(() => {
    if (context.searched !== '') {
      getSearchResult(context.searched);
    } else {
      getDiscover();
    }
  }, [context.searched]);

  /**
   * decide if get the result by a search param or not
   */
  const fetchMovies = () => {
    if (search === "") {
      if (context.searched !== '') {
        getSearchResult(context.searched);
      } else {
        getDiscover();
      }

    } else {
      getSearchResult(search);
    }
    window.scrollTo(0, 0)
  }

  /**
   * function to search after "Enter key" in the input text
   * update the state in context
   * @param {event} the value in the search  
   */
  const handleSearchInput = (event) => {
    let s = event.target.value;
    setSearch(s);
    if (event.key === "Enter" && search !== context.searched) {
      context.setSearched(search);
      fetchMovies();
    }
  };

  /**
   * fucntion to set the context rating
   * @param {rate} value of the rating
   */
  const handleRatingFilter = (rate) => {
    let r = rate
    context.setRatingFilter(r);
  };

  /**
   * render the the elements
   */
  return (
    <React.Fragment>
      <NavBar handleSearchInput={handleSearchInput} handleRatingFilter={handleRatingFilter} />
      <MoviesGrid searchResult={searchResult} ratingFilter={context.ratingFilter} />
    </React.Fragment>
  );
};
