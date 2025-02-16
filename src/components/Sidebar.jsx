import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'
import { toggleSidebar } from '../store/utils'

const Sidebar = () => {
    const data = [
        { icon: <i className="ri-home-line"></i>, name: 'Feed', link: 'feed' },
        { icon: <i className="ri-compass-line"></i>, name: 'Trending', link: 'trending' },
        { icon: <i className="ri-compass-line"></i>, name: 'Movies', link: 'movies' },
        { icon: <i className="ri-compass-line"></i>, name: 'Tv', link: 'tv' },
        { icon: <i className="ri-funds-line"></i>, name: 'Browse', link: 'browse' },
        { icon: <i className="ri-compass-line"></i>, name: 'Person', link: 'person' },
        { icon: <i className="ri-save-line"></i>, name: 'My Playlist', link: 'playlist' },
        { icon: <i className="ri-account-circle-fill"></i>, name: 'Account', link: 'account' },
        { icon: <i className="ri-logout-circle-line"></i>, name: 'Logout', link: 'logout' }
    ]
    const location = useLocation()
    const dispatch = useDispatch()
    const sidebar = useSelector(state => state.utils)



    return (
        <div className={`${sidebar ? 'w-[16%]' : 'w-[5%]'} ${location.pathname === '/feed' && 'static '} fixed z-[1000] bg-white h-full transition-all p-2 flex justify-center items-center `}>
            <ul onMouseEnter={() => dispatch(toggleSidebar(true))} onMouseLeave={() => dispatch(toggleSidebar(false))} className='w-full  h-full p-2 flex flex-col items-center gap-5'>
                {/* {[<i className="ri-compass-line"></i>, <i className="ri-funds-line"></i>, <i className="ri-save-line"></i>, <i className="ri-account-circle-fill"></i>].map(e => (
                    <li className='text-4xl cursor-pointer flex'>{e}</li>
                ))} */}
                {data.map((e, i) => (
                    <NavLink to={`/${e.link}`} key={i} className={({ isActive }) => `${isActive ? 'bg-red-500 text-white' : ''} shadow-md   ${i === 5 && 'mt-auto'}  ${sidebar ? 'rounded-lg w-full px-2 py-2 justify-start' : 'rounded-full justify-center h-[45px] w-[45px]'}  items-center gap-2 transition-all  cursor-pointer flex hover:bg-red-500 hover:text-white`}>
                        <span className='text-xl inline-block'>{e.icon}</span>
                        {sidebar && <p className='text-xl capitalize font-semibold text-nowrap'>{e.name}</p>}
                    </NavLink>
                ))}
            </ul>

        </div>
    )
}

export default Sidebar