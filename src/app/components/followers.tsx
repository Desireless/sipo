import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import React from 'react'

type FollowersProps = {
    userId: string;
}

export default async function Followers({ userId }: FollowersProps) {
    const supabase = createServerComponentClient<Database>({ cookies });

    const { data, error } = await supabase.from('followers').select('*').eq('following_id', userId);
    const numberOfFollowers = data?.length ? data?.length : 0;
    return (
        <div className='flex flex-row gap-2'>
            <p className='font-bold'>{numberOfFollowers}</p>
            <p>Seguidores</p>
        </div>
    )
}
