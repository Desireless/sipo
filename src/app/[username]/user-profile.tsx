import React from 'react'
import FollowButton from '../components/follow-button';
import Followers from '../components/followers';
import { UserAvatar } from '../components';
import Image from "next/image";
import Link from 'next/link';


type UserProfileProps = {
    user_id: string;
    name: string | null;
    username: string | null;
    avatar_url: string | null;
    is_following: boolean;
}

export default async function UserProfile(userData: UserProfileProps) {
    return (
        <div className='flex flex-col justify-start px-4 py-4 border border-gray-300 border-t-0 gap-4 overflow-y-auto'>
            <div className='flex flex-row justify-end'>

                {/* TODO: Link deberia mostrarse solo si el perfil es igual al usuario logeado  */}
                <Link
                    href={`/account`}
                >
                    <div className='flex flex-row gap-2 justify-center items-center opacity-50 '>
                        <Image
                            src="/edit-3-svgrepo-com.svg"
                            alt="Avatar image"
                            width="18"
                            height="18"
                            className='dark:invert'
                            priority
                        />
                        <p className='text-black text-sm'>Editar perfil</p>
                    </div>
                </Link>
            </div>


            <div className='flex justify-center max-w-full'>
                <UserAvatar avatarUrl={userData.avatar_url} resolution='large' />
            </div>

            <FollowButton userId={userData.user_id} isFollower={userData.is_following} />

            <div className='mt-2 flex flex-col'>
                <p className='text-lg font-bold whitespace-normal break-words'>{userData.name}</p>
                <p className='text-gray-400'>@{userData.username}</p>
            </div>

            <div className='flex flex-row justify-between'>
                <Followers userId={userData.user_id} />
            </div>
        </div>
    )
}

