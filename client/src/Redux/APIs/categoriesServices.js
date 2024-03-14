import Axios from './Axios.js';

// ********** PUBLIC APIS **********

// Get all categories
const getAllCategoriesService = async () => {
   const { data } = await Axios.get('/categories');
   return data
}

// ********** ADMIN APIS **********

// Create new category
const createCategoryService = async ({ label, desc, value }, token) => {
   const { data } = await Axios.post('/categories', { label, desc, value }, {
      headers: { Authorization: `Bearer ${token}` }
   });
   return data
}

// Delete category
const deleteCategoryService = async (id, token) => {
   const { data } = await Axios.delete(`/categories/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
   });
   return data
}

// Update category
const updateCategoryService = async (id, { label, desc, value }, token) => {
   const { data } = await Axios.put(`/categories/${id}`, { label, desc, value }, {
      headers: { Authorization: `Bearer ${token}` }
   });
   return data
}

export {
   getAllCategoriesService,
   createCategoryService,
   deleteCategoryService,
   updateCategoryService
}