import * as moviesConstants from "../Constants/moviesConstants";

// GET ALL MOVIES
export const getAllMoviesReducer = (state = { movies: [] }, action) => {
   switch (action.type) {
      case moviesConstants.GET_ALL_MOVIES_REQUEST:
         return { isLoading: true };
      case moviesConstants.GET_ALL_MOVIES_SUCCESS:
         return {
            isLoading: false,
            movies: action.payload.movies,
            page: action.payload.page,
            pages: action.payload.pages,
            totalMovies: action.payload.totalMovies
         };
      case moviesConstants.GET_ALL_MOVIES_FAIL:
         return { isLoading: false, isError: action.payload };
      default:
         return state;
   }
}

// GET RANDOM MOVIES
export const getRandomMoviesReducer = (state = { movies: [] }, action) => {
   switch (action.type) {
      case moviesConstants.GET_RANDOM_MOVIES_REQUEST:
         return { isLoading: true };
      case moviesConstants.GET_RANDOM_MOVIES_SUCCESS:
         return { isLoading: false, movies: action.payload };
      case moviesConstants.GET_RANDOM_MOVIES_FAIL:
         return { isLoading: false, isError: action.payload };
      default:
         return state;
   }
}

// GET MOVIE BY ID
export const getMovieByIdReducer = (state = { movie: {} }, action) => {
   switch (action.type) {
      case moviesConstants.GET_MOVIE_BY_ID_REQUEST:
         return { isLoading: true };
      case moviesConstants.GET_MOVIE_BY_ID_SUCCESS:
         return { isLoading: false, movie: action.payload };
      case moviesConstants.GET_MOVIE_BY_ID_FAIL:
         return { isLoading: false, isError: action.payload };
      default:
         return state;
   }
}

// GET TOP RATED MOVIES
export const getTopRatedMoviesReducer = (state = { movies: [] }, action) => {
   switch (action.type) {
      case moviesConstants.GET_TOP_RATED_MOVIES_REQUEST:
         return { isLoading: true };
      case moviesConstants.GET_TOP_RATED_MOVIES_SUCCESS:
         return { isLoading: false, movies: action.payload };
      case moviesConstants.GET_TOP_RATED_MOVIES_FAIL:
         return { isLoading: false, isError: action.payload };
      default:
         return state;
   }
}

// CREATE REVIEW
export const reviewMovieReducer = (state = {}, action) => {
   switch (action.type) {
      case moviesConstants.REVIEW_MOVIE_REQUEST:
         return { isLoading: true };
      case moviesConstants.REVIEW_MOVIE_SUCCESS:
         return { isLoading: false, isSuccess: true };
      case moviesConstants.REVIEW_MOVIE_FAIL:
         return { isLoading: false, isError: action.payload };
      case moviesConstants.REVIEW_MOVIE_RESET:
         return {};
      default:
         return state;
   }
}

// DELETE MOVIE BY ID
export const deleteMovieReducer = (state = {}, action) => {
   switch (action.type) {
      case moviesConstants.DELETE_MOVIE_REQUEST:
         return { isLoading: true };
      case moviesConstants.DELETE_MOVIE_SUCCESS:
         return { isLoading: false, isSuccess: true };
      case moviesConstants.DELETE_MOVIE_FAIL:
         return { isLoading: false, isError: action.payload };
      default:
         return state;
   }
}

// DELETE ALL MOVIES
export const deleteAllMoviesReducer = (state = {}, action) => {
   switch (action.type) {
      case moviesConstants.DELETE_ALL_MOVIES_REQUEST:
         return { isLoading: true };
      case moviesConstants.DELETE_ALL_MOVIES_SUCCESS:
         return { isLoading: false, isSuccess: true };
      case moviesConstants.DELETE_ALL_MOVIES_FAIL:
         return { isLoading: false, isError: action.payload };
      default:
         return state;
   }
}

// CREATE MOVIE
export const createMovieReducer = (state = {}, action) => {
   switch (action.type) {
      case moviesConstants.CREATE_MOVIE_REQUEST:
         return { isLoading: true };
      case moviesConstants.CREATE_MOVIE_SUCCESS:
         return { isLoading: false, isSuccess: true };
      case moviesConstants.CREATE_MOVIE_FAIL:
         return { isLoading: false, isError: action.payload };
      case moviesConstants.CREATE_MOVIE_RESET:
         return {};
      default:
         return state;
   }
}

// CHARACTER MOVIE
export const charactersReducer = (state = { characters: [] }, action) => {
   switch (action.type) {
      case moviesConstants.ADD_CHARACTERS:
         return { characters: [...state.characters, action.payload] };
      case moviesConstants.EDIT_CHARACTERS:
         const updatedCharacters = state.characters.map((character) =>
            character._id === action.payload._id ? character._id : character
         );
         return { characters: updatedCharacters };
      case moviesConstants.DELETE_CHARACTERS:
         return { ...state, characters: state.characters.filter((character) => character._id !== action.payload) };
      case moviesConstants.RESET_CHARACTERS:
         return { characters: [] };
      default:
         return state;
   }
}