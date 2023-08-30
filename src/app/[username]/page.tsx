import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import React from 'react'
import UserProfile from './user-profile';
import Image from "next/image";
import formatTweetDate from '@/utils/format-tweet-date';


export default async function Profile({ params }: { params: { username: string } }) {

    /**
     * 1. Verificar que el parametro de la url cumple con el formato de un username
     */
    const user = params.username;
    const reg = /^[0-9a-zA-Z]+$/;

    if (!reg.test(user)) {
        return notFound();
    }

    /**
     * 2. Verificar que el usuario esta logueado
     */
    const supabase = createServerComponentClient<Database>({ cookies });
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        redirect('/login');
    }

    /**
     * 3. Verificar que el usuario existe
     */
    const { data } = await supabase.from('profiles').select('id,name,  username, avatar_url').eq('username', user).single();

    if (!data) {
        return notFound();
    }

    /**
     * 4. Obtener los tweets del usuario
     */
    const tweets = await supabase.from('tweets').select('*, likes(tweet_id)').eq('user_id', data.id).order('created_at', { ascending: false }).range(0,1);

    return (
        <div className='w-full max-w-full mx-auto'>
            {/* Navbar */}
            <nav className='border border-gray-300 border-t-0 px-4 py-5 flex'>
                <p>HOLA</p>
            </nav>

            {/* Contenedor en medio */}
            <div className='w-full max-w-xl mx-auto'>

                {/* profile */}
                <UserProfile user_id={data.id} name={data.name} username={data.username} avatar_url={data.avatar_url} />

                {/* Tweets */}
                {
                    tweets.data?.map((tweet) => (

                        <div key={tweet.id} className='border border-gray-300 border-t-0 px-4 py-5 flex'>
                            <div className="flex-shrink-0 max-w-full">
                                <Image
                                    src={data.avatar_url}
                                    alt="Avatar"
                                    width={48}
                                    height={48}
                                    className='rounded-full' />
                            </div>
                            <div className="ml-4 overflow-y-auto">
                                <p>
                                    <span className="font-bold">@{data.username}</span>
                                    <span className="text-gray-400 ml-2">~</span>
                                    <span className="text-gray-400 ml-2">{formatTweetDate(tweet.created_at)}</span>
                                </p>
                                <p className="whitespace-normal break-words">{tweet.title}</p>
                                <div className="flex flex-col justify-start gap-2 mt-2">
                                    <p>0 LIKES</p>
                                </div>
                            </div>
                        </div>
                    ))
                }

            </div>

        </div>

    )
}
