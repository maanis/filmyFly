import React from 'react'
import Sidebar from './Sidebar'
import Main from './Main'

const Feed = () => {
    return (
        <div className='h-screen flex w-full bg-zinc-100'>
            <Sidebar />
            <Main />
        </div>
    )
}

export default Feed