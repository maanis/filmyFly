import React, { useRef } from 'react'
import bg from '../assets/bg.jpg'
import DetsNav from './DetsNav'
import openAi from '../utils/openAi'

const Browse = () => {
    const input = useRef(null)
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(input.current.value)
        const resp = await openAi.chat.completions.create({
            messages: [{ role: 'user', content: input.current.value }],
            model: 'gpt-4o',
        });
        console.log(resp)
    }
    return (
        <div className='w-full h-screen bg-zinc-950'>
            <img src={bg} className='w-full h-screen object-cover fixed top-0' alt="" />
            <div className="gradient absolute w-full h-full top-0 left-0 bg-black/65"></div>
            <DetsNav />
            <form className='max-w-screen-md justify-center gap-4 flex items-center relative mx-auto min-h-10 py-5 rounded-md mt-5 bg-zinc-400/20 backdrop-blur-sm shadow-2xl'>
                <input ref={input} className='w-[80%] min-h-[2.5rem] border-1 text-black bg-white border-zinc-400 text-xl px-3 outline-none rounded-md shadow-md' type="text" placeholder='which kinda movies do you want?' name="" id="" />
                <button onClick={handleSubmit} className='px-7 inline-block py-1 text-white h-[2.5rem] rounded-md bg-red-500 hover:bg-red-700 transition-colors cursor-pointer font-semibold text-lg'>Search</button >
            </form>
            <div className="gradient relative mt-5 h-0.5 w-full bg-gray-500/45"></div>

        </div>
    )
}

export default Browse