import React, { useState } from 'react'

const Topnav = () => {
    const [input, setinput] = useState(null)
    console.log(input)
    return (
        <div className='h-[9%] shadow-md flex items-center justify-end w-full px-8'>
            <div className='flex relative w-[32rem]'>
                <span className='text-2xl absolute left-2'><i class="ri-search-eye-line"></i></span>
                <input value={input} onChange={(e) => setinput(e.currentTarget.value)} className='w-full border-2 border-zinc-100 text-xl px-10 outline-none border-none shadow-md' type="text" name="" id="" />
                <span onClick={() => setinput('')} className='text-3xl cursor-pointer ml-2'><i class="ri-close-fill"></i></span>
                <div className="absolute w-[93%] p-3 overflow-y-auto h-[20rem] bg-zinc-300 top-[52px]">
                    <div className="flex mb-3 rounded-md items-center gap-4 p-2 h-[6rem] bg-red-200 w-full">
                        <img className='w-16 h-full object-cover' src="https://images.news18.com/ibnlive/uploads/2022/07/salman-khan-22-1.jpg" alt="" />
                        <h2 className='font-bold text-xl'>Salman Khan</h2>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Topnav