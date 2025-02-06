import React from 'react'

const Sidebar = ({ sidebar, sidebarfn }) => {
    const data = [
        { icon: <i class="ri-home-line"></i>, name: 'Feed' },
        { icon: <i class="ri-compass-line"></i>, name: 'Trending' },
        { icon: <i class="ri-funds-line"></i>, name: 'Browse' },
        { icon: <i class="ri-save-line"></i>, name: 'My Playlist' },
        { icon: <i class="ri-account-circle-fill"></i>, name: 'Account' },
        { icon: <i class="ri-logout-circle-line"></i>, name: 'Logout' }
    ]
    return (
        <div className={`${sidebar ? 'w-[15%]' : 'w-[5%]'} h-full transition-all p-2 flex justify-center items-center `}>
            <ul onMouseEnter={() => sidebarfn(true)} onMouseLeave={() => sidebarfn(false)} className='w-full  h-full p-2 flex flex-col items-center gap-5'>
                {/* {[<i class="ri-compass-line"></i>, <i class="ri-funds-line"></i>, <i class="ri-save-line"></i>, <i class="ri-account-circle-fill"></i>].map(e => (
                    <li className='text-4xl cursor-pointer flex'>{e}</li>
                ))} */}
                {data.map((e, i) => (
                    <li className={`text-4xl shadow-md px-1 ${i === 5 && 'mt-auto'} py-2 ${sidebar ? 'rounded-lg' : 'rounded-full justify-center'} items-center gap-2 transition-all w-full cursor-pointer flex`}>
                        <span className='text-2xl inline-block'>{e.icon}</span>
                        {sidebar && <p className='text-2xl capitalize font-semibold text-nowrap'>{e.name}</p>}
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default Sidebar