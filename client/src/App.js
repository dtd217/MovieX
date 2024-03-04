import React from 'react'
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
import Users from './Pages/Dashboard/Admin/Users'
import AddMovie from './Pages/Dashboard/Admin/AddMovie'
import ToastContainer from './Components/Notifications/ToastContainer'

const App = () => {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/tv-series' element={<TvSeries />} />
          <Route path='/movie-ova' element={<MovieOVA />} />
          <Route path='/filters' element={<Filters />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/movie/:id' element={<SingleMovie />} />
          <Route path='/watch/:id' element={<WatchPage />} />
          {/* Dashboard */}
          <Route path='/profile' element={<Profile />} />
          <Route path='/password' element={<Password />} />
          <Route path='/bookmarks' element={<Bookmarks />} />

          <Route path='/movie-list' element={<MovieList />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/users' element={<Users />} />
          <Route path='/add-movie' element={<AddMovie />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App