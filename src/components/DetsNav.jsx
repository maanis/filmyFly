import React from 'react'
import Topnav from './Topnav'
import { useNavigate } from 'react-router-dom'

const DetsNav = () => {
    const navigate = useNavigate()
    return (
        <div className='h-[9%] px-8 w-full  flex gap-2 justify-between items-center mx-auto bg-zinc-300/20 backdrop-blur-md'>
            <div className="relative z-50 text-white"><button className='cursor-pointer' onClick={() => navigate(-1)}><i className="ri-arrow-left-line text-2xl hover:text-red-500 transition-colors"></i></button>
                <button className='cursor-pointer ml-3' onClick={() => navigate('/feed')}><i className="ri-home-3-fill text-2xl hover:text-yellow-500 transition-colors"></i></button></div>
            <Topnav />
        </div>
    )
}

export default DetsNav