import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Feed from './components/Feed'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './utils/firebase'
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from './store/userSlice'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email, photoURL } = user;
        dispatch(addUser({ uid, displayName, email, photoURL }))
      } else {
        dispatch(removeUser())
      }
    });
  }, [])
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