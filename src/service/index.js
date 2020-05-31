import axios from "axios";

// api key 
const apiKey = "dcd0ca1dc956db6ed9a9ecb65ce6ba2a";
// base uri
const url = "https://api.themoviedb.org/3";
const imgBaseUrl = "https://image.tmdb.org/t/p/original";

// endpoints to use
const discoverMovieUrl = `${url}/discover/movie`;
const searchMovieUrl = `${url}/search/movie`;
const movieDetailUrl = `${url}/movie`;

/**
 * function to get movies calling the endpoint (discoverMovieUrl)
 */
export const getMovies = async () => {
  try {
    const { data } = await axios.get(discoverMovieUrl, {
      params: {
        api_key: apiKey,
        sort_by: "popularity.desc",
      },
    });
    return fixDataSet(data); // estructure of movie data to use
  } catch (error) { }
};

/**
 * function to search movies calling the endpoint (searchMovieUrl)
 * @param {query} value to search
 */
export const searchMovies = async (query) => {
  try {
    const { data } = await axios.get(searchMovieUrl, {
      params: {
        api_key: apiKey,
        query: query,
      },
    });
    return fixDataSet(data); // estructure of movie data to use
  } catch (error) { }
};

/**
 * function to get the detail of a specific movie calling endpoint (movieDetailUrl)
 * @param {id} movie id 
 */
export const getMovieDetail = async (id) => {
  try {
    const { data } = await axios.get(`${movieDetailUrl}/${id}`, {
      params: {
        api_key: apiKey,
      },
    });

    return fixData(data);
  } catch (error) { }
};

/**
 * function to transform the data into you result structure or virtual object
 * @param {data} data from api result
 */
const fixDataSet = (data) => {
  const fixedData = data["results"].map((movie) => fixData(movie));
  return fixedData;
};

/**
 * virtual object to return always the data in this structure
 * @param {movie} receive the data 
 */
const fixData = (movie) => {
  return {
    id: movie["id"],
    title: movie["title"],
    overview: movie["overview"],
    genres: movie["genres"],
    year: movie["release_date"].slice(0, 4),
    poster: imgBaseUrl + movie["poster_path"],
    backdrop: imgBaseUrl + movie["backdrop_path"],
    rating: movie["vote_average"],
  };
};
