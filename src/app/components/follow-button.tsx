'use client'

import React, { useState } from 'react'
import { followUser } from './follow-button-action';
import { ToastService } from '@/services';

type FollowButtonProps = {
    userId: string;
    isFollower: boolean;
}

export default function FollowButton( { userId, isFollower }: FollowButtonProps ) {
    const [isFollowing, setIsFollowing] = useState(isFollower);

    const handleFollow = async () => {
        const result = await followUser(userId);

        if (result?.error) {
			ToastService.error(result.error)
		} else {
			ToastService.success("Siguiendo");
            setIsFollowing(!isFollowing);
		}

    }

    return (
        <div className='flex justify-center max-w-full'>
            <button className=" bg-black rounded-lg transition duration-200 hover:bg-slate-700 px-4 py-1 text-white font-semibold"
                onClick={handleFollow}
            >

                {isFollowing ? 'Unfollow' : 'Follow'}

            </button>
        </div>
    )
}

