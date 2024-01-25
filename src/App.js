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

const App = () => {
  return (
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
        <Route path='/profile' element={<Profile />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App