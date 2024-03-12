import * as categoriesConstants from "../Constants/categoriesConstants";
import * as categoriesApi from "../APIs/categoriesServices";
import { ErrorsAction, tokenProtection } from "../Protection";
import toast from "react-hot-toast";

// GET ALL CATEGORIES ACTIONS
export const getAllCategoriesAction = () => async (dispatch) => {
   try {
      dispatch({ type: categoriesConstants.GET_ALL_CATEGORIES_REQUEST });
      const { data } = await categoriesApi.getAllCategoriesService()
      dispatch({ type: categoriesConstants.GET_ALL_CATEGORIES_SUCCESS, payload: data });
   } catch (error) {
      ErrorsAction(error, dispatch, categoriesConstants.GET_ALL_CATEGORIES_FAIL);
   }
}

// CREATE CATEGORY ACTIONS
export const createCategoryAction = (title) => async (dispatch, getState) => {
   try {
      dispatch({ type: categoriesConstants.CREATE_CATEGORY_REQUEST });
      await categoriesApi.createCategoryService(title, tokenProtection(getState));
      dispatch({ type: categoriesConstants.CREATE_CATEGORY_SUCCESS });
      toast.success("Thêm thể loại thành công");
   } catch (error) {
      ErrorsAction(error, dispatch, categoriesConstants.CREATE_CATEGORY_FAIL);
   }
}

// UPDATE CATEGORY ACTIONS
export const updateCategoryAction = (id, title) => async (dispatch, getState) => {
   try {
      dispatch({ type: categoriesConstants.UPDATE_CATEGORY_REQUEST });
      await categoriesApi.updateCategoryService(id, title, tokenProtection(getState));
      dispatch({ type: categoriesConstants.UPDATE_CATEGORY_SUCCESS });
      toast.success("Cập nhật thể loại thành công");
   } catch (error) {
      ErrorsAction(error, dispatch, categoriesConstants.UPDATE_CATEGORY_FAIL);
   }
}

// DELETE CATEGORY ACTIONS
export const deleteCategoryAction = (id) => async (dispatch, getState) => {
   try {
      dispatch({ type: categoriesConstants.DELETE_CATEGORY_REQUEST });
      await categoriesApi.deleteCategoryService(id, tokenProtection(getState));
      dispatch({ type: categoriesConstants.DELETE_CATEGORY_SUCCESS });
      toast.success("Xoá thể loại thành công");
   } catch (error) {
      ErrorsAction(error, dispatch, categoriesConstants.DELETE_CATEGORY_FAIL);
   }
}