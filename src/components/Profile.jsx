import React from 'react';
import { Mail, User } from 'lucide-react';

export function Profile() {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
            <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                    <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                        alt="Sarah Wilson's profile"
                        className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                    />
                    <div className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                </div>

                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800">Sarah Wilson</h2>
                    <div className="flex items-center justify-center text-gray-600 mt-1">
                        <Mail className="w-4 h-4 mr-2" />
                        <span>sarah.wilson@designstudio.com</span>
                    </div>
                </div>

                <button className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <User className="w-4 h-4 mr-2" />
                    Edit Profile
                </button>
            </div>
        </div>
    );
}