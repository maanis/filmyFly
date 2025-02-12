import React from 'react'
import loader from '/loader.jpg'
const Loader = () => {
    return (
        <div className='w-full flex bg-[#e2e2e2] justify-center items-center h-screen'>
            <img style={{
                filter: 'invert(1)'
            }} className='w-[32rem] object-cover' src={loader} alt="" />
        </div>
    )
}

export default Loader