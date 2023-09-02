import React from 'react'
import Image from "next/image";
import FollowButton from '../components/follow-button';
import Followers from '../components/followers';

type UserProfileProps = {
    user_id: string;
    name: string | null;
    username: string | null;
    avatar_url: string | null;
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
                        priority
                    />
                    :
                    <Image
                    src="/profile-no-avatar-icon.svg"
                    alt="No avatar image"
                    className="rounded-full dark:invert"
                    width={70}
                    height={70}
                    priority
                />
                    }
            </div>

            <FollowButton />

            <div className='mt-2 whitespace-normal break-words'>
                <p className='text-lg font-bold'>{userData.name}</p>
                <p className='text-gray-400'>@{userData.username}</p>

            </div>

            <div className='flex flex-row justify-between'>
                <Followers userId={userData.user_id}/>
            </div>
        </div>
    )
}

