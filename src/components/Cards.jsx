import React from 'react'
import { Link } from 'react-router-dom'

const Cards = ({ data }) => {
    console.log("Cards Rendered, Data Length:", data.length); // Debugging

    return (
        <div className='w-full min-h-screen overflow-y-auto overflow-x-hidden p-5 flex flex-wrap gap-5' id="scrollableDiv">
            {data.map((d) => (
                <Link
                    key={d.id} // 🔥 Unique Key Fix
                    style={{
                        backgroundImage: `url('https://image.tmdb.org/t/p/original${d.backdrop_path || d.poster_path || d.profile_path}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                    className={`w-[13%] transition-all relative rounded-md cursor-pointer h-[16rem] inline-block shrink-0`}
                />
            ))}
        </div>
    )
}

export default Cards
