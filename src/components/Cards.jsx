import React from 'react'
import { Link } from 'react-router-dom'
import { noImg } from '../utils/constants'

const Cards = ({ data, title }) => {
    return (
        <div className='w-full min-h-full overflow-y-auto overflow-x-hidden p-5 flex flex-wrap gap-5'>
            {data.map((d, i) => (
                <Link to={`/${d.media_type || title}/${d.id}`} style={{
                    backgroundImage: `url('https://image.tmdb.org/t/p/original${d.backdrop_path || d.poster_path || d.profile_path
                        ? `https://image.tmdb.org/t/p/original${d.backdrop_path || d.poster_path || d.profile_path}`
                        : noImg}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }} key={i} className={`w-[13%] transition-all relative rounded-md cursor-pointer h-[16rem] inline-block shrink-0`}>
                    {d.vote_average >= 0 && <div className="absolute bottom-8 right-[-15px] bg-yellow-500 rounded-full h-[45px] flex justify-center items-center font-semibold text-lg w-[45px]">{(d.vote_average * 10).toFixed()}<sup className='text-xs'>%</sup></div>}
                </Link>
            ))}
        </div>
    )
}

export default Cards
