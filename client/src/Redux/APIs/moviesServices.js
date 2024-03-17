import Axios from './Axios.js';

// ********** PUBLIC APIS **********

// Get all movies
const getAllMoviesService = async ({ categories, year, rate, search, pageNumber }) => {
   const { data } = await Axios.get(`/movies?categories=${categories.join("&")}&year=${year}&rate=${rate}&search=${search}&pageNumber=${pageNumber}`);
   return data
}

// Get movie by id
const getMovieByIdService = async (id) => {
   const { data } = await Axios.get(`/movies/${id}`);
   return data
}

export { getAllMoviesService, getMovieByIdService }