import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Feed from './components/Feed'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/feed" element={<Feed />} />
    </Routes>
  )
}

export default App