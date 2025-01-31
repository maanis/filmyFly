import React from 'react'

const MovieTitle = ({ title, overview, release_date }) => {
    return (
        <div className='absolute top-1/2 -translate-y-1/2 px-9'>
            <h2 className='text-5xl font-bold'>{title}</h2>
            <p className='w-1/3 text-sm text-zinc-700 my-4'>{overview}</p>
            <p className='font-semibold'>{release_date}</p>
            <button className='px-5 py-2 text-lg bg-zinc-300 font-semibold mt-3 rounded-md'>Play Now</button >
            <button className='px-5 py-2 text-lg bg-red-600 text-white font-semibold rounded-md ml-3'>More Info</button >
        </div>
    )
}

export default MovieTitle