import React from 'react'

const Main = ({ sidebar }) => {
    return (
        <div className={`${sidebar ? 'w-[85%]' : 'w-[95%]'} transition-all bg-blue-500`}>Main</div>
    )
}

export default Main