import React from 'react';
import { Home, Mail, User } from 'lucide-react';
import { useSelector } from 'react-redux';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';

export function Profile() {
    const data = useSelector(state => state.user)
    const navigate = useNavigate()
    return data ? (
        <div className="bg-white h-full w-full rounded-lg shadow-lg p-6 max-w-sm mx-auto">
            <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                    <img
                        src={data.photoURL}
                        alt="Sarah Wilson's profile"
                        className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                    />
                    <div className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                </div>

                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800">{data.displayName}</h2>
                    <div className="flex items-center justify-center text-gray-600 mt-1">
                        <Mail className="w-4 h-4 mr-2" />
                        <span>{data.email}</span>
                    </div>
                </div>

                <button className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <User className="w-4 h-4 mr-2" />
                    Edit Profile
                </button>
                <button onClick={() => navigate('/feed')} className="flex items-center justify-center px-4 py-2 bg-yellow-600 text-white cursor-pointer rounded-lg hover:bg-yellow-700 transition-colors">
                    <Home className="w-4 h-4 mr-2" />
                    Home
                </button>
            </div>
        </div>
    ) : <Loader />
}