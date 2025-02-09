import React from 'react'
import Topnav from './Topnav'
import FeedHeader from './FeedHeader'
import FeedCards from './FeedCards'

const Main = ({ sidebar, data, func }) => {
    return (
        <div className={`${sidebar ? 'w-[85%]' : 'w-[95%]'} relative transition-all `}>
            <Topnav />
            <FeedHeader data={data} />
            <div className="flex pl-3 pr-5 justify-between items-center h-[6%]">
                <p className='text-2xl font-semibold'>Popular</p>
                <div class="select-dropdown">
                    <select onChange={(e) => func(e.target.value)}>
                        <option value="all">All</option>
                        <option value="movie">Movies</option>
                        <option value="tv">TV Shows</option>
                    </select>
                </div>
            </div>
            <FeedCards />
        </div>
    )
}

export default Main