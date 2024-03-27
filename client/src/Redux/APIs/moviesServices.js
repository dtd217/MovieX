import Axios from './Axios.js';

// ********** PUBLIC APIS **********

// Get all movies
const getAllMoviesService = async ({ categories, year, type, search, pageNumber }) => {
   const { data } = await Axios.get(`/movies?categories=${categories.join("&categories=")}&year=${year}&type=${type}&search=${search}&pageNumber=${pageNumber}`);
   return data
}

// Get movie by id
const getMovieByIdService = async (id) => {
   const { data } = await Axios.get(`/movies/${id}`);
   return data
}

// Get random movie
const getRandomMovieService = async () => {
   const { data } = await Axios.get('/movies/random/all');
   return data
}

// Get top rated movies
const getTopRatedMoviesService = async () => {
   const { data } = await Axios.get('/movies/rated/top');
   return data
}

// Review movie
const reviewMovieService = async (id, review, token) => {
   const { data } = await Axios.post(`/movies/${id}/reviews`, review, {
      headers: { Authorization: `Bearer ${token}` }
   });
   return data
}

export {
   getAllMoviesService,
   getMovieByIdService,
   getRandomMovieService,
   getTopRatedMoviesService,
   reviewMovieService
}