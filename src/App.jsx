import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Feed from './components/Feed'

const App = () => {

  return (
    <div className='h-screen w-full'>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </div>
  )
}

export default App