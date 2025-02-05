import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Main from './Main'

const Feed = () => {
    const [sidebar, setSidebar] = useState(false)

    return (
        <div className='h-screen flex w-full bg-zinc-100'>
            <Sidebar sidebar={sidebar} sidebarfn={setSidebar} />
            <Main sidebar={sidebar} sidebarfn={setSidebar} />
        </div>
    )
}

export default Feed