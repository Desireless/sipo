'use client'

import React, { useState } from 'react'
import { followAction } from './follow-button-action';
import { ToastService } from '@/services';
import { useRouter } from 'next/navigation';

type FollowButtonProps = {
    userId: string;
    isFollower: boolean;
}

export default function FollowButton( { userId, isFollower }: FollowButtonProps ) {
    const [isFollowing, setIsFollowing] = useState(isFollower);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleFollow = async () => {
        setIsLoading(true);

        const result = await followAction(userId, isFollowing);

        if (result?.error) {
			ToastService.error(result.error)
            setIsLoading(false);
		} else {
            setIsFollowing(!isFollowing);
            setIsLoading(false);
            router.refresh();
		}

    }

    return (
        <div className='flex justify-center max-w-full'>
            <button
            className=" bg-black rounded-lg transition duration-200 hover:bg-slate-700 px-4 py-1 text-white font-semibold disabled:opacity-25"
            onClick={handleFollow}
            disabled={isLoading}
            >
                {isFollowing ? 'Unfollow' : 'Follow'}
            </button>
        </div>
    )
}

