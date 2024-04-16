import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import TvSeries from './Pages/TvSeries'
import MovieOVA from './Pages/MovieOVA'
import NotFound from './Pages/NotFound'
import Login from './Pages/Login'
import Register from './Pages/Register'
import SingleMovie from './Pages/SingleMovie'
import Filters from './Pages/Filters'
import WatchPage from './Pages/WatchPage'
import Profile from './Pages/Dashboard/Profile'
import Password from './Pages/Dashboard/Password'
import Bookmarks from './Pages/Dashboard/Bookmarks'
import MovieList from './Pages/Dashboard/Admin/MovieList'
import Categories from './Pages/Dashboard/Admin/Categories'
import MoviesPage from './Pages/MoviesPage'
import Users from './Pages/Dashboard/Admin/Users'
import AddMovie from './Pages/Dashboard/Admin/AddMovie'
import ToastContainer from './Components/Notifications/ToastContainer'
import { AdminProtectedRouter, ProtectedRouter } from './ProtectedRouter'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategoriesAction } from './Redux/Actions/categoriesActions'
import { getAllMoviesAction } from './Redux/Actions/moviesActions'
import { userGetBookmarksAction } from './Redux/Actions/userActions'
import toast from 'react-hot-toast'
import UpdateMovie from './Pages/Dashboard/Admin/UpdateMovie'
import ScrollToTop from './ScrollToTop'
import MovieCart from './Pages/MovieCart'
import Orders from './Pages/Dashboard/Admin/Orders'
import ViewOrder from './Pages/ViewOrder'

const App = () => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.userLogin)
  const { isSuccess, isError } = useSelector(state => state.userGetBookmarks)
  const { isError: categoriesError } = useSelector(state => state.getAllCategories)

  useEffect(() => {
    dispatch(getAllCategoriesAction())
    dispatch(getAllMoviesAction({}))
    if (userInfo) {
      dispatch(userGetBookmarksAction())
    }
    if (isError || categoriesError) {
      toast.error(isError || categoriesError)
      dispatch({ type: 'ADD_BOOKMARKS_RESET' })
    }
    if (isSuccess) {
      dispatch({ type: 'ADD_BOOKMARKS_RESET' })
    }
  }, [dispatch, userInfo, isError, categoriesError, isSuccess])

  return (
    <>
      <ToastContainer />
      <Router>
        <ScrollToTop>
          <Routes>
            {/* PUBLIC ROUTES */}
            <Route path='/' element={<HomePage />} />
            <Route path='/tv-series' element={<TvSeries />} />
            <Route path='/movie-ova' element={<MovieOVA />} />
            <Route path='/filters' element={<Filters />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/movies/:id' element={<SingleMovie />} />
            <Route path='/movies/search/:search' element={<MoviesPage />} />
            <Route path='/watch/:id' element={<WatchPage />} />
            <Route path='/cart' element={<MovieCart />} />
            <Route path='*' element={<NotFound />} />

            {/* PRIVATE ROUTES */}
            <Route element={<ProtectedRouter />}>
              <Route path='/profile' element={<Profile />} />
              <Route path='/password' element={<Password />} />
              <Route path='/bookmarks' element={<Bookmarks />} />

              {/* ADMIN ROUTES */}
              <Route element={<AdminProtectedRouter />}>
                <Route path='/movie-list' element={<MovieList />} />
                <Route path='/categories' element={<Categories />} />
                <Route path='/users' element={<Users />} />
                <Route path='/add-movie' element={<AddMovie />} />
                <Route path='/update/:id' element={<UpdateMovie />} />
                <Route path='orders' element={<Orders />} />
                <Route path='/orders/:id' element={<ViewOrder />} />
              </Route>
            </Route>
          </Routes >
        </ScrollToTop>
      </Router >
    </>
  )
}

export default App