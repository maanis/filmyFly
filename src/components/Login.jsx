import React from 'react'
import { Link } from 'react-router-dom'
import bg from '../../public/bg.jpg'
import Header from './Header'

const Login = () => {
    return (
        <div style={{ backgroundImage: `url(${bg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} className='h-full flex justify-center items-center w-full relative'>
            <div className="gradient absolute w-full h-full bg-black/70 "></div>
            <Header />

        </div>
    )
}

export default Login