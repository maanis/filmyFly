import React, { useState } from 'react'

const Topnav = () => {
    const [input, setinput] = useState(null)
    console.log(input)
    return (
        <div className='h-[9%] shadow-md flex items-center justify-end w-full px-8'>
            <div className='flex relative'>
                <span className='text-2xl absolute left-2'><i class="ri-search-eye-line"></i></span>
                <input value={input} onChange={(e) => setinput(e.currentTarget.value)} className='w-[32rem] border-2 border-zinc-100 text-xl px-10 outline-none border-none shadow-md' type="text" name="" id="" />
                <span onClick={() => setinput('')} className='text-3xl cursor-pointer ml-2'><i class="ri-close-fill"></i></span>
            </div>
        </div>
    )
}

export default Topnav