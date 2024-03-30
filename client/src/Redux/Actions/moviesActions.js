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

// REVIEW MOVIE ACTIONS
export const reviewMovieAction = ({ id, review }) => async (dispatch, getState) => {
   try {
      dispatch({ type: moviesConstants.REVIEW_MOVIE_REQUEST });
      const response = await moviesApi.reviewMovieService(id, review, tokenProtection(getState));
      dispatch({ type: moviesConstants.REVIEW_MOVIE_SUCCESS, payload: response });
      toast.success("Đánh giá thành công");
      dispatch({ type: moviesConstants.REVIEW_MOVIE_REQUEST });
      dispatch(getMovieByIdAction(id));
   } catch (error) {
      ErrorsAction(error, dispatch, moviesConstants.REVIEW_MOVIE_FAIL);
   }
}

// DELETE MOVIE ACTIONS
export const deleteMovieAction = (id) => async (dispatch, getState) => {
   try {
      dispatch({ type: moviesConstants.DELETE_MOVIE_REQUEST });
      const response = await moviesApi.deleteMovieService(id, tokenProtection(getState));
      dispatch({ type: moviesConstants.DELETE_MOVIE_SUCCESS, payload: response });
      toast.success("Xoá phim thành công");
      dispatch(getAllMoviesAction({}));
   } catch (error) {
      ErrorsAction(error, dispatch, moviesConstants.DELETE_MOVIE_FAIL);
   }
}

// DELETE ALL MOVIES ACTIONS
export const deleteAllMoviesAction = () => async (dispatch, getState) => {
   try {
      dispatch({ type: moviesConstants.DELETE_ALL_MOVIES_REQUEST });
      const response = await moviesApi.deleteAllMoviesService(tokenProtection(getState));
      dispatch({ type: moviesConstants.DELETE_ALL_MOVIES_SUCCESS, payload: response });
      toast.success("Xoá tất cả phim thành công");
      dispatch(getAllMoviesAction({}));
   } catch (error) {
      ErrorsAction(error, dispatch, moviesConstants.DELETE_ALL_MOVIES_FAIL);
   }
}

// CREATE MOVIE ACTIONS
export const createMovieAction = (movie) => async (dispatch, getState) => {
   try {
      dispatch({ type: moviesConstants.CREATE_MOVIE_REQUEST });
      const response = await moviesApi.createMovieService(movie, tokenProtection(getState));
      dispatch({ type: moviesConstants.CREATE_MOVIE_SUCCESS, payload: response });
      toast.success("Thêm phim thành công");
      dispatch(resetCharactersAction());
   } catch (error) {
      ErrorsAction(error, dispatch, moviesConstants.CREATE_MOVIE_FAIL);
   }
}

// ********** CHARACTERS ACTIONS **********

// ADD CHARACTERS
export const addCharactersAction = (characters) => async (dispatch, getState) => {
   dispatch({ type: moviesConstants.ADD_CHARACTERS, payload: characters });
   localStorage.setItem('characters', JSON.stringify(getState().charactersCRUD.characters));
}

// DELETE CHARACTERS
export const deleteCharactersAction = (id) => async (dispatch, getState) => {
   dispatch({ type: moviesConstants.DELETE_CHARACTERS, payload: id });
   localStorage.setItem('characters', JSON.stringify(getState().charactersCRUD.characters));
}

// EDIT CHARACTERS
export const editCharactersAction = (character) => async (dispatch, getState) => {
   dispatch({ type: moviesConstants.EDIT_CHARACTERS, payload: character });
   localStorage.setItem('characters', JSON.stringify(getState().charactersCRUD.characters));
}

// RESET CHARACTERS
export const resetCharactersAction = () => async (dispatch) => {
   dispatch({ type: moviesConstants.RESET_CHARACTERS });
   localStorage.removeItem('characters');
}