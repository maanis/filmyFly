import React from 'react'
import Topnav from './Topnav'
import FeedHeader from './FeedHeader'
import FeedCards from './FeedCards'
import Dropdown from './Dropdown'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSidebar } from '../store/utils'

const Main = ({ sidebar, data, func }) => {
    const { feedItems } = useSelector(state => state.movies)
    const dispatch = useDispatch()

    return (
        <div className={`${sidebar ? 'md:w-[88%]' : 'w-full'} relative transition-all `}>
            <div className='h-[9%] bg-zinc-600/65 z-50 backdrop-blur-xs  absolute shadow-md flex items-center justify-end max-md:justify-between w-full px-8 max-sm:px-4'>
                <div onClick={() => dispatch(toggleSidebar(true))} className='text-2xl max-md:text-[25px] md:hidden cursor-pointer text-zinc-200'><i class="ri-menu-2-line"></i></div>
                <Topnav />
            </div>
            <FeedHeader data={data} />
            <div className="flex pl-3 pr-5 justify-between items-center max-md:px-7 max-md:relative top-[64%] h-[6%]">
                <p className='text-2xl font-semibold max-md:text-white max-md:text-lg'>Popular</p>
                <Dropdown options={['all', 'movie', 'tv',]} method={func} />
            </div>

            <FeedCards data={feedItems} />
        </div >
    )
}

export default Main