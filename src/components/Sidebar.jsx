import React from 'react'

const Sidebar = () => {
    return (
        <div className='w-[5%] h-full p-8 bg-red-700'>
            <ul className='w-full flex flex-col items-center gap-5'>
                {[<i class="ri-compass-line"></i>, <i class="ri-funds-line"></i>, <i class="ri-save-line"></i>, <i class="ri-account-circle-fill"></i>].map(e => (
                    <li className='text-4xl cursor-pointer'>{e}</li>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar