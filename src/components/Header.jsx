import React from 'react'
import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = ({ feed = false }) => {
    const data = useSelector(state => state && state.user)
    // console.log(data)
    const navigate = useNavigate()
    const handleSignOut = () => {
        signOut(auth).then(() => {
            navigate('/')
        }).catch((error) => {
            console.log(error)
        });
    }
    return (
        <div className="flex p-3 bg-gradient-to-br from-black/65 justify-between items-center w-full absolute top-0">
            <div className='w-44  top-0 left-0'>
                <img src="../../public/logo.png" alt="" />
            </div>
            {feed && <div className='flex gap-4'>
                <img src={data ? data.photoURL : 'https://occ-0-2087-2186.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABXz4LMjJFidX8MxhZ6qro8PBTjmHbxlaLAbk45W1DXbKsAIOwyHQPiMAuUnF1G24CLi7InJHK4Ge4jkXul1xIW49Dr5S7fc.png?r=e6e'} alt="" />
                <button onClick={handleSignOut} className='font-semibold cursor-pointer text-red-600'>Logout</button>
            </div>}
        </div>
    )
}

export default Header