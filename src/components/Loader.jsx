import React, { useEffect, useState } from 'react'
import loader from '/loader.jpg'
const Loader = () => {
    const [text, settext] = useState('')
    useEffect(() => {
        setTimeout(() => {
            settext("If it's not loading try using VPN...")
            // return () => {
            //     settext('')
            // }
        }, 6000);
    }, [])
    return (
        <div className='w-full flex flex-col bg-[#e2e2e2] justify-center items-center h-screen'>
            <img style={{
                filter: 'invert(1)'
            }} className='w-[32rem] object-cover' src={loader} alt="" />
            {text && <h2 className='relative top-[-95px] text-red-500 font-semibold text-lg'>{text}</h2>}
        </div>
    )
}

export default Loader