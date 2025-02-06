import React from 'react'
import Topnav from './Topnav'

const Main = ({ sidebar }) => {
    return (
        <div className={`${sidebar ? 'w-[85%]' : 'w-[95%]'} transition-all `}>
            <Topnav />
        </div>
    )
}

export default Main