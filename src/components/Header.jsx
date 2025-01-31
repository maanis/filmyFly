import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoImg } from '../utils/constants';
import { addUser, removeUser } from '../store/userSlice';


const Header = ({ feed = false }) => {
    const data = useSelector(state => state && state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
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
            console.log(error)
        });
    }
    return (
        <div className="flex p-3 bg-gradient-to-b from-black/65 justify-between items-center w-full absolute top-0">
            <div className='w-44  top-0 left-0'>
                <img src={logoImg} alt="" />
            </div>
            {feed && <div className='flex gap-2'>
                <img className='w-8 rounded-full object-cover' src={data ? data.photoURL : 'https://occ-0-2087-2186.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABXz4LMjJFidX8MxhZ6qro8PBTjmHbxlaLAbk45W1DXbKsAIOwyHQPiMAuUnF1G24CLi7InJHK4Ge4jkXul1xIW49Dr5S7fc.png?r=e6e'} alt="" />
                <button onClick={handleSignOut} className='font-semibold cursor-pointer text-red-600'>Logout</button>
            </div>}
        </div>
    )
}

export default Header