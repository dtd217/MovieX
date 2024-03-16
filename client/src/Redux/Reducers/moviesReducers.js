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