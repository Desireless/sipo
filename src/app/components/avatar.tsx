import React from 'react'
import Image from "next/image";
import { AvatarResolutions } from '@/models';

type UserAvatarProps = {
    avatarUrl: string | null;
    resolution: 'small' | 'medium' | 'large';
}

export default function UserAvatar({ avatarUrl, resolution }: UserAvatarProps) {
    const url = avatarUrl ? avatarUrl : '';
    const { width, height } = AvatarResolutions[resolution];

    return (
        <>
            {!!url.length ?
                <Image
                    src={url}
                    alt="Avatar image"
                    width={width}
                    height={height}
                    className='rounded-full'
                    priority
                />
                :
                <Image
                    src="/profile-no-avatar-icon.svg"
                    alt="No avatar image"
                    className="rounded-full dark:invert"
                    width={width}
                    height={height}
                    priority
                />
            }
        </>
    )
}