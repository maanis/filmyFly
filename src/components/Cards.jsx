import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { noImg } from '../utils/constants'

const Cards = ({ data, title }) => {
    const [showText, setshowText] = useState(true)
    return (
        <div className='w-full min-h-full overflow-y-auto overflow-x-hidden p-5 flex flex-wrap gap-5'>
            {data.map((d, i) => (
                <Link to={`/${d.media_type || title}/${d.id}`} style={{
                    backgroundImage: d.backdrop_path || d.poster_path || d.profile_path ? `url('https://image.tmdb.org/t/p/original${d.backdrop_path || d.poster_path || d.profile_path})` : `url(${noImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }} key={i} className={`w-[13%]  transition-all relative rounded-md cursor-pointer h-[16rem] inline-block shrink-0`}>
                    {d.vote_average >= 0 && <div className="absolute top-8 right-[-15px] bg-yellow-500 rounded-full h-[45px] z-50 flex justify-center items-center font-semibold text-lg w-[45px]">{(d.vote_average * 10).toFixed()}<sup className='text-xs'>%</sup>
                    </div>}
                    <div className="gradient z-10 absolute h-full w-full bg-gradient-to-t from-black rounded-md"></div>
                    <h2 className={`z-50 ${showText ? 'visible' : 'hidden'} text-white absolute text-center w-full bottom-2 font-semibold`}>{d.title || d.name || d.original_name}</h2>
                </Link>
            ))}
        </div>
    )
}

export default Cards
