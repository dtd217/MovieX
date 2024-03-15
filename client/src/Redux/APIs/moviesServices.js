import Axios from './Axios.js';

// ********** PUBLIC APIS **********

// Get all movies
const getAllMoviesService = async () => {
   const { data } = await Axios.get('/movies');
   return data
}

// Get movie by id
const getMovieByIdService = async (id) => {
   const { data } = await Axios.get(`/movies/${id}`);
   return data
}