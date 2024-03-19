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

// 