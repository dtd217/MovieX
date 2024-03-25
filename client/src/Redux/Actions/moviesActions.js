import * as moviesConstants from "../Constants/moviesConstants";
import * as moviesApi from "../APIs/moviesServices";
import { ErrorsAction, tokenProtection } from "../Protection";
import toast from "react-hot-toast";

// GET ALL MOVIES ACTIONS
export const getAllMoviesAction = ({ categories = [], year = [], type = [], search = "", pageNumber = "" }) => async (dispatch) => {
   try {
      dispatch({ type: moviesConstants.GET_ALL_MOVIES_REQUEST });
      const response = await moviesApi.getAllMoviesService({ categories, year, type, search, pageNumber });
      dispatch({ type: moviesConstants.GET_ALL_MOVIES_SUCCESS, payload: response });
   } catch (error) {
      ErrorsAction(error, dispatch, moviesConstants.GET_ALL_MOVIES_FAIL);
   }
}

// GET MOVIE BY ID ACTIONS
export const getMovieByIdAction = (id) => async (dispatch) => {
   try {
      dispatch({ type: moviesConstants.GET_MOVIE_BY_ID_REQUEST });
      const response = await moviesApi.getMovieByIdService(id);
      dispatch({ type: moviesConstants.GET_MOVIE_BY_ID_SUCCESS, payload: response });
   } catch (error) {
      ErrorsAction(error, dispatch, moviesConstants.GET_MOVIE_BY_ID_FAIL);
   }
}

// GET RANDOM MOVIES ACTIONS
export const getRandomMoviesAction = () => async (dispatch) => {
   try {
      dispatch({ type: moviesConstants.GET_RANDOM_MOVIES_REQUEST });
      const response = await moviesApi.getRandomMovieService();
      dispatch({ type: moviesConstants.GET_RANDOM_MOVIES_SUCCESS, payload: response });
   } catch (error) {
      ErrorsAction(error, dispatch, moviesConstants.GET_RANDOM_MOVIES_FAIL);
   }
}

// GET TOP RATED MOVIES ACTIONS
export const getTopRatedMoviesAction = () => async (dispatch) => {
   try {
      dispatch({ type: moviesConstants.GET_TOP_RATED_MOVIES_REQUEST });
      const response = await moviesApi.getTopRatedMoviesService();
      dispatch({ type: moviesConstants.GET_TOP_RATED_MOVIES_SUCCESS, payload: response });
   } catch (error) {
      ErrorsAction(error, dispatch, moviesConstants.GET_TOP_RATED_MOVIES_FAIL);
   }
}