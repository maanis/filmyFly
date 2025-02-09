import React from 'react'
import Topnav from './Topnav'
import FeedHeader from './FeedHeader'

const Main = ({ sidebar }) => {
    return (
        <div className={`${sidebar ? 'w-[85%]' : 'w-[95%]'} transition-all `}>
            <Topnav />
            <FeedHeader />
        </div>
    )
}

export default Main