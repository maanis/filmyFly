import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Feed from './components/Feed'
import Loader from './components/Loader'

const App = () => {

  return (
    <div className='h-screen w-full'>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/trending" element={<Loader />} />
      </Routes>
    </div>
  )
}

export default App