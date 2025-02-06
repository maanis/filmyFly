import React from 'react'

const Sidebar = ({ sidebar, sidebarfn }) => {
    return (
        <div className={`${sidebar ? 'w-[15%]' : 'w-[5%]'} h-full transition-all p-2 flex justify-center items-center bg-red-700`}>
            <ul onMouseEnter={() => sidebarfn(true)} onMouseLeave={() => sidebarfn(false)} className='w-full bg-yellow-600 h-full p-6 flex flex-col items-center gap-5'>
                {/* {[<i class="ri-compass-line"></i>, <i class="ri-funds-line"></i>, <i class="ri-save-line"></i>, <i class="ri-account-circle-fill"></i>].map(e => (
                    <li className='text-4xl cursor-pointer flex'>{e}</li>
                ))} */}
                <li className='text-4xl cursor-pointer flex'>
                    <i class="ri-compass-line"></i>
                    <p>Trending</p>
                </li>
                <li className='text-4xl cursor-pointer flex'>
                    <i class="ri-funds-line"></i>
                    <p>Browse</p>
                </li>
                <li className='text-4xl cursor-pointer flex'>
                    <i class="ri-save-line"></i>
                    <p>My Playlist</p>
                </li>
                <li className='text-4xl cursor-pointer flex'>
                    <i class="ri-account-circle-fill"></i>
                    <p>Account</p>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar