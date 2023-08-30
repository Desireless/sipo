import React from 'react'
import Image from "next/image";
import UserNoImageIcon from '@/public/user-icon.svg';

type UserProfileProps = {
    user_id: string;
    name: string;
    username: string;
    avatar_url: string;
}

export default function UserProfile(userData: UserProfileProps) {
    const avatar_url = userData.avatar_url ? userData.avatar_url : '';
    return (
        <div className='flex flex-col justify-start px-4 py-6 border border-gray-300 border-t-0 gap-4 overflow-y-auto'>
            <div className='flex justify-center max-w-full'>
                {!!avatar_url.length ?
                    <Image
                        src={avatar_url}
                        alt="Avatar"
                        width={70}
                        height={70}
                        className='rounded-full'
                    />
                    :
                    <>
                        <svg width="70" height="70" viewBox="2 2 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" fill="#2A4157" fillOpacity="0.24" />
                            <circle cx="12" cy="10" r="4" fill="#222222" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M18.2209 18.2462C18.2791 18.3426 18.2613 18.466 18.1795 18.5432C16.5674 20.0662 14.3928 21 12 21C9.60728 21 7.43264 20.0663 5.82057 18.5433C5.73877 18.466 5.72101 18.3427 5.77918 18.2463C6.94337 16.318 9.29215 15 12.0001 15C14.7079 15 17.0567 16.3179 18.2209 18.2462Z" fill="#222222" />
                        </svg>

                    </>}
            </div>

            <div className='flex justify-center max-w-full'>
                <button className="w-20 bg-black rounded-lg transition duration-200 hover:bg-slate-500 px-4 py-1 text-white font-semibold "> Seguir </button>
            </div>

            <div className='mt-2 whitespace-normal break-words'>
                <p className='text-lg font-bold'>{userData.name}</p>
                <p className='text-gray-400'>@{userData.username}</p>

            </div>

            <div className='flex flex-row justify-between'>
                <p>Seguidores</p>
            </div>
        </div>
    )
}

