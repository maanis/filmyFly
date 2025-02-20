import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { toggleSidebar } from '../store/utils'
import { Button, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { addUser, removeUser } from '../store/userSlice';
import { auth } from '../utils/firebase';

const Sidebar = () => {
    const data = [
        { icon: <i className="ri-home-line"></i>, name: 'Feed', link: 'feed' },
        { icon: <i className="ri-compass-line"></i>, name: 'Trending', link: 'trending' },
        { icon: <i className="ri-compass-line"></i>, name: 'Movies', link: 'movies' },
        { icon: <i className="ri-compass-line"></i>, name: 'Tv', link: 'tv' },
        { icon: <i className="ri-funds-line"></i>, name: 'Browse', link: 'browse' },
        { icon: <i className="ri-compass-line"></i>, name: 'Person', link: 'person' },
        { icon: <i className="ri-save-line"></i>, name: 'My Playlist', link: 'playlist' },
        { icon: <i className="ri-account-circle-fill"></i>, name: 'Profile', link: 'profile' },

    ]
    const location = useLocation()
    const dispatch = useDispatch()
    const sidebar = useSelector(state => state.utils)
    const navigate = useNavigate()

    const openDeleteModal = () =>
        modals.openConfirmModal({
            title: 'Logout your profile',
            centered: true,
            children: (
                <Text size="sm">
                    Are you sure you want to log-out your profile?
                </Text>
            ),
            labels: { confirm: 'Logout', cancel: "Cancel" },
            confirmProps: { color: 'red' },
            onCancel: () => console.log('Cancel'),
            onConfirm: () => handleSignOut(),
        });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged
            (auth, (user) => {
                if (user) {
                    const { uid, displayName, email, photoURL } = user;
                    dispatch(addUser({ uid, displayName, email, photoURL }))
                    navigate('/feed')
                } else {
                    dispatch(removeUser())
                    navigate('/')
                }
            });
        return () => unsubscribe()
    }, [])

    const handleSignOut = () => {
        signOut(auth).then(() => {
        }).catch((error) => {
            consoleconsole.log(error)
        });
    }

    const handleLogoutModal = () => {
        openDeleteModal()
        dispatch(toggleSidebar(false))
    }


    return (
        <>
            <div className={`${sidebar ? 'w-[16%] max-[960px]:w-[20%]' : 'w-[5%] max-md:w-0 max-[960px]:w-[7%]'} ${location.pathname === '/feed' && 'static '} max-md:hidden fixed z-[1000] bg-white h-full transition-all p-2 flex justify-center items-center `}>
                <ul onMouseEnter={() => dispatch(toggleSidebar(true))} onMouseLeave={() => dispatch(toggleSidebar(false))} className='w-full max-md:hidden h-full p-2 flex flex-col items-center gap-5'>
                    {/* {[<i className="ri-compass-line"></i>, <i className="ri-funds-line"></i>, <i className="ri-save-line"></i>, <i className="ri-account-circle-fill"></i>].map(e => (
                    <li className='text-4xl cursor-pointer flex'>{e}</li>
                ))} */}
                    {data.map((e, i) => (
                        <NavLink to={`/${e.link}`} key={i} className={({ isActive }) => `${isActive ? 'bg-red-500 text-white' : ''} shadow-md   ${i === 5 && 'mt-auto'}  ${sidebar ? 'rounded-lg w-full px-2 py-2 max-[1056px]:py-1 justify-start' : 'rounded-full justify-center h-[45px] w-[45px] max-[1056px]:h-[36px] max-[1056px]:w-[36px] '}  items-center gap-2 transition-all max-md:hidden  cursor-pointer flex hover:bg-red-500 hover:text-white`}>
                            <span className='text-xl max-md:hidden max-[1056px]:text-lg inline-block'>{e.icon}</span>
                            {sidebar && <p className='text-xl max-[1056px]:text-lg max-[960px]:text-[16px] capitalize font-semibold text-nowrap'>{e.name}</p>}
                        </NavLink>
                    ))}
                    <NavLink onClick={openDeleteModal} className={`shadow-md ${sidebar ? 'rounded-lg w-full px-2 py-2 max-[1056px]:py-1 justify-start' : 'rounded-full justify-center h-[45px] w-[45px] max-[1056px]:h-[36px] max-[1056px]:w-[36px] '}  items-center gap-2 transition-all max-md:hidden  cursor-pointer flex hover:bg-red-500 hover:text-white`}>
                        <span className='text-xl max-md:hidden max-[1056px]:text-lg inline-block'><i className="ri-logout-circle-line"></i></span>
                        {sidebar && <p className='text-xl max-[1056px]:text-lg max-[960px]:text-[16px] capitalize font-semibold text-nowrap'>Logout</p>}
                    </NavLink>
                </ul>



            </div>

            <div className={`w-[35%] max-[640px]:w-[55%] max-[450px]:w-[75%]  top-0 bottom-0 overflow-y-auto absolute z-[999999] bg-white/25 py-4 px-3 backdrop-blur-md h-full ${sidebar ? 'left-0' : 'left-[-100%]'} md:hidden transition-all delay-100 ease-out`}>
                <ul className='w-full h-full p-2 flex flex-col items-center gap-5'>

                    {data.map((e, i) => (
                        <NavLink onClick={() => dispatch(toggleSidebar(false))} to={`/${e.link}`} key={i} className={({ isActive }) => `${isActive ? 'bg-red-500 text-white' : ''} shadow-md rounded-lg w-full px-2 py-2 max-[1056px]:py-1 justify-start  ${i === 5 && 'mt-auto'}  items-center gap-2 transition-all  cursor-pointer flex hover:bg-red-500 hover:text-white`}>

                            <p className='text-xl max-[1056px]:text-lg max-[960px]:text-[16px] capitalize font-semibold text-nowrap'>{e.name}</p>
                        </NavLink>
                    ))}
                    <NavLink onClick={handleLogoutModal} className={`shadow-md ${sidebar ? 'rounded-lg w-full px-2 py-2 max-[1056px]:py-1 justify-start' : 'rounded-full justify-center h-[45px] w-[45px] max-[1056px]:h-[36px] max-[1056px]:w-[36px] '}  items-center gap-2 transition-all cursor-pointer flex hover:bg-red-500 hover:text-white`}>
                        <span className='text-xl max-[1056px]:text-lg inline-block'><i className="ri-logout-circle-line"></i></span>
                        {sidebar && <p className='text-xl max-[1056px]:text-lg max-[960px]:text-[16px] capitalize font-semibold text-nowrap'>Logout</p>}
                    </NavLink>
                </ul>
            </div>
        </>
    )
}

export default Sidebar