import React from 'react'
import { Link } from 'react-router-dom'

const Cards = ({ data }) => {
    return (
        <div className='w-full h-[91%] overflow-y-auto p-5 flex flex-wrap gap-5'>
            {data.map((d, i) => (
                <Link style={{
                    backgroundImage: `url('https://image.tmdb.org/t/p/original${d.backdrop_path || d.poster_path || d.profile_path}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }} key={i} className={`w-[13%] transition-all relative rounded-md cursor-pointer h-[16rem] inline-block shrink-0`}>
                </Link>
            ))}
        </div>
    )
}

export default Cards