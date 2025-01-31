import React from 'react'

const MovieTitle = ({ title, overview, release_date }) => {
    return (
        <div className='absolute top-0 aspect-video bg-gradient-to-r from-black text-white w-full px-9'>
            <div className="absolute top-[37%] -translate-y-1/2">
                <h2 className='text-5xl font-bold'>{title}</h2>
                <p className='w-1/3 text-sm text-zinc-300 my-4'>{overview}</p>
                <p className='font-semibold'>{release_date}</p>
                <button className='px-5 cursor-pointer py-2 text-lg bg-zinc-100 text-black font-semibold mt-3 rounded-md'>Play Now</button >
                <button className='px-5 cursor-pointer py-2 text-lg bg-red-600 text-white font-semibold rounded-md ml-3'>More Info</button >
            </div>
        </div>
    )
}

export default MovieTitle