import React from 'react'
import Topnav from './Topnav'
import FeedHeader from './FeedHeader'

const Main = ({ sidebar, data }) => {
    return (
        <div className={`${sidebar ? 'w-[85%]' : 'w-[95%]'} relative transition-all `}>
            <Topnav />
            <FeedHeader data={data} />
        </div>
    )
}

export default Main