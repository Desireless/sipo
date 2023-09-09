import React from 'react'
import FollowButton from '../components/follow-button';
import Followers from '../components/followers';
import { UserAvatar } from '../components';

type UserProfileProps = {
    user_id: string;
    name: string | null;
    username: string | null;
    avatar_url: string | null;
    is_following: boolean;
}

export default async function UserProfile(userData: UserProfileProps) {
    return (
        <div className='flex flex-col justify-start px-4 py-6 border border-gray-300 border-t-0 gap-4 overflow-y-auto'>
            <div className='flex justify-center max-w-full'>
                <UserAvatar avatarUrl={userData.avatar_url} resolution='large' />
            </div>

            <FollowButton userId={userData.user_id} isFollower={userData.is_following}/>

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

