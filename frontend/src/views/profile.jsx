import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
    const { user } = useSelector((state) => state.user);
    return (
        <div className='flex flex-col items-center justify-center h-screen p-5'>
            <div className='flex items-center justify-center'>
                <img src={user?.avatar?.url} alt={user?.name} className='w-20 h-20 rounded-full' />
            </div>
            <h1 className='text-2xl font-bold'>{user?.name}</h1>
            <p className='text-gray-500'>{user?.email}</p>
        </div>
    );
};

export default Profile;