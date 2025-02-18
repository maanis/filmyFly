import React from 'react'
import Topnav from './Topnav'
import FeedHeader from './FeedHeader'
import FeedCards from './FeedCards'
import Dropdown from './Dropdown'
import { useSelector } from 'react-redux'

const Main = ({ sidebar, data, func }) => {
    const { feedItems } = useSelector(state => state.movies)

    return (
        <div className={`${sidebar ? 'w-[84%]' : 'w-full'} relative transition-all `}>
            <div className='h-[9%] bg-zinc-600/65 z-50 backdrop-blur-xs absolute shadow-md flex items-center justify-end w-full px-8'>

                <Topnav />
            </div>
            <FeedHeader data={data} />
            <div className="flex pl-3 pr-5 justify-between items-center max-md:px-14 max-md:relative top-[73%] h-[6%]">
                <p className='text-2xl font-semibold max-md:text-white'>Popular</p>
                <Dropdown options={['all', 'movie', 'tv',]} method={func} />
            </div>

            <FeedCards data={feedItems} />
        </div >
    )
}

export default Main