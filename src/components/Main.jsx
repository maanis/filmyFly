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
            <Topnav />
            <FeedHeader data={data} />
            <div className="flex pl-3 pr-5 justify-between items-center h-[6%]">
                <p className='text-2xl font-semibold'>Popular</p>
                <Dropdown options={['all', 'movie', 'tv',]} method={func} />
            </div>

            <FeedCards data={feedItems} />
        </div >
    )
}

export default Main