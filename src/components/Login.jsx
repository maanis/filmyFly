import React from 'react'
import { Link } from 'react-router-dom'
import bg from '../../public/bg.jpg'
import Header from './Header'

const Login = () => {
    return (
        <div style={{ backgroundImage: `url(${bg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} className='h-full flex justify-center items-center w-full relative'>
            <div className="gradient absolute w-full h-full bg-black/55 "></div>
            <Header />

            <div className='w-[25%] h-[70%] text-white rounded-md  bg-[#21212136] backdrop-blur-[8px] border border-red-600 relative p-5'>
                <h2 className='text-4xl font-semibold'>Sign In</h2>
                <input type="text" placeholder='Email or mobile number' className='p-3 w-full text-lg outline-none border bg-transparent rounded-md border-zinc-800 mt-10' />
                <input type="password" placeholder='Password' className='p-3 w-full text-lg outline-none border bg-transparent rounded-md border-zinc-800 mt-5' />
            </div>

        </div>
    )
}

export default Login