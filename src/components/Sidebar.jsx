import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = ({ sidebar, sidebarfn }) => {
    const data = [
        { icon: <i className="ri-home-line"></i>, name: 'Feed', link: 'feed' },
        { icon: <i className="ri-compass-line"></i>, name: 'Trending', link: 'trending' },
        { icon: <i className="ri-funds-line"></i>, name: 'Browse', link: 'browse' },
        { icon: <i className="ri-save-line"></i>, name: 'My Playlist', link: 'my-playlist' },
        { icon: <i className="ri-account-circle-fill"></i>, name: 'Account', link: 'account' },
        { icon: <i className="ri-logout-circle-line"></i>, name: 'Logout', link: 'logout' }
    ]
    return (
        <div className={`${sidebar ? 'w-[15%]' : 'w-[5%]'} h-full transition-all p-2 flex justify-center items-center `}>
            <ul onMouseEnter={() => sidebarfn(true)} onMouseLeave={() => sidebarfn(false)} className='w-full  h-full p-2 flex flex-col items-center gap-5'>
                {/* {[<i className="ri-compass-line"></i>, <i className="ri-funds-line"></i>, <i className="ri-save-line"></i>, <i className="ri-account-circle-fill"></i>].map(e => (
                    <li className='text-4xl cursor-pointer flex'>{e}</li>
                ))} */}
                {data.map((e, i) => (
                    <NavLink to={`/${e.link}`} key={i} className={`text-4xl shadow-md px-2 ${i === 5 && 'mt-auto'} py-2 ${sidebar ? 'rounded-lg' : 'rounded-full justify-center'} items-center gap-2 transition-all w-full cursor-pointer flex hover:bg-red-500 hover:text-white`}>
                        <span className='text-2xl inline-block'>{e.icon}</span>
                        {sidebar && <p className='text-2xl capitalize font-semibold text-nowrap'>{e.name}</p>}
                    </NavLink>
                ))}
            </ul>

        </div>
    )
}

export default Sidebar