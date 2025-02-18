import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Login from './components/Login'
import Feed from './components/Feed'
import Trending from './components/Trending'
import Sidebar from './components/Sidebar'
import Person from './components/Person'
import MovieDets from './components/MovieDets'
import TvDets from './components/TvDets'
import Tv from './components/Tv'
import Movies from './components/Movies'
import Trailer from './components/Trailer'
import Error from './components/Error'
import PersonDets from './components/PersonDets'
import Playlist from './components/Playlist'
import Browse from './components/Browse'
import SkeletonCards from './components/SkeletonCards'

const App = () => {
  const { pathname } = useLocation()
  const allowedRoutes = ['/feed', '/trending', '/movies', '/tv', '/person'];
  return (
    <div className='h-screen flex w-full'>
      {allowedRoutes.includes(pathname) && <Sidebar />}
      {allowedRoutes.includes(pathname) && <div className="gradient w-[1px] h-full bg-zinc-300"></div>}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/movie/:id" element={<MovieDets />} >
          <Route path='/movie/:id/trailer' element={<Trailer />} />
        </Route>
        <Route path="/tv/:id" element={<TvDets />} >
          <Route path='/tv/:id/trailer' element={<Trailer />} />
        </Route>
        <Route path="/person" element={<Person />} />
        <Route path="/person/:id" element={<PersonDets />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/skeleton" element={<SkeletonCards />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  )
}

export default App