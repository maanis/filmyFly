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

    return (
        <div className="flex p-3 px-8 bg-[#7e7e7e29] shadow-xl backdrop-blur-sm justify-center items-center w-full absolute top-0 z-50">
            <div className='w-32 top-0 left-0'>
                <img src={logoImg} alt="" />
            </div>
        </div>
    )
}

export default Header