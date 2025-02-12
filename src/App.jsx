import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Feed from './components/Feed'
import Trending from './components/Trending'
import Sidebar from './components/Sidebar'
import Popular from './components/Popular'
import Person from './components/Person'

const App = () => {

  return (
    <div className='h-screen flex w-full'>
      <Sidebar />
      <div className="gradient w-[1px] h-full bg-zinc-300"></div>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/person" element={<Person />} />
      </Routes>
    </div>
  )
}

export default App