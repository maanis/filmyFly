import React, { useRef, useState } from 'react'
import bg from '../assets/bg.jpg'
import DetsNav from './DetsNav'
import openAi from '../utils/openAi'
import anthropic from '../utils/openAi'
import openai from '../utils/openAi'
import { openAi_key } from '../utils/constants'
import model from '../utils/openAi'
import API_OPTIONS from '../utils/ApiOptions'
import Cards from './Cards'

const Browse = () => {
    const [tmdb, settmdb] = useState(null)
    const fetchMovie = async (movie) => {
        const data = await fetch(`https://api.themoviedb.org/3/search/multi?query=${movie}&include_adult=false&language=en-US&page=1`, API_OPTIONS)
        const res = await data.json()
        return res
    }
    const input = useRef(null)
    const handleSubmit = async (e) => {
        e.preventDefault();


const prompt = `Act as a movie Reccomendation system and get me only the names of 5 movies based on the prompt: ${input.current.value}, and the response should be like this ex: gadar, koi mil gaya, krish, veer zaara and singham. alwways give only 5 movies names like the example as shown no matter what dont exaggerate`

const result = await model.generateContent(prompt);
const res = result.response.text();
const arr = res.split(',')
const data = arr.map(movie => fetchMovie(movie))
const resp = await Promise.all(data)
const tmdbResp = resp.map(e => e.results[0])
settmdb(tmdbResp)
    };

return (
    <div className='w-full h-screen bg-zinc-950 overflow-hidden'>
        <img src={bg} className='w-full h-screen object-cover fixed top-0' alt="" />
        <div className="gradient absolute w-full h-full top-0 left-0 bg-black/65"></div>
        <DetsNav />
        <form className='max-w-screen-md justify-center px-3 gap-4 flex items-center relative mx-auto min-h-[11%] py-5 rounded-md mt-5 bg-zinc-400/20 backdrop-blur-sm shadow-2xl'>
            <input ref={input} className='w-[80%] min-h-[2.5rem] border-1 text-black bg-white border-zinc-400 text-xl px-3 outline-none rounded-md shadow-md' type="text" placeholder='which kinda movies do you want?' name="" id="" />
            <button onClick={handleSubmit} className='px-7 inline-block py-1 text-white h-[2.5rem] rounded-md bg-red-500 hover:bg-red-700 transition-colors cursor-pointer font-semibold text-lg'>Search</button >
        </form>
        <div className="gradient relative mt-5 h-0.5 w-full bg-gray-500/45"></div>
        <div className='h-[80%]'>
            {/* {tmdb != null ? <Cards data={tmdb} title={'movie'} /> : <h2 className='relative'>Loading</h2>} */}
        </div>
        <h2 className='absolute left-1/2 -translate-y-1/2 -translate-x-1/2 bg-gradient-to-t w-full text-center px-5 from-black text-white text-2xl top-1/2 font-semibold z-50'>Dont use this for now..., kyunki error aayega!</h2>
    </div>
)
}

export default Browse