'use client'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Likes from "./likes";
import { useEffect, experimental_useOptimistic as useOptimistic } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";


export default function Tweets({ tweets }: { tweets: TweetWithAuthor[] }) {
    const [optimisticTweets, addOptimisticTweets] = useOptimistic<TweetWithAuthor[], TweetWithAuthor>(
        tweets,
        (currentOptimistic, newTweet) => {
            const newOptimisticTweets = [...currentOptimistic];

            const index = newOptimisticTweets.findIndex((tweet) => tweet.id === newTweet.id);
            newOptimisticTweets[index] = newTweet;
            return newOptimisticTweets;
        }
    );

    const supabase = createClientComponentClient();
    const router = useRouter();

    useEffect(() => {
        // El canal puede tener cualquier nombre
        const channel = supabase.channel('realtime-tweets').on(
            'postgres_changes', {
            event: '*',
            schema: 'public',
            table: 'tweets'
        }, (payload) => { router.refresh(); }// payload representa lo que se ha cambiado
        ).subscribe();

        return () => {
            supabase.removeChannel(channel);
        }
    }, [supabase, router])

    return optimisticTweets.map(tweet => (
        <div key={tweet.id} className='border border-gray-300 border-t-0 px-4 py-8 flex'>
            <div>
                <Image
                    src={tweet.author.avatar_url}
                    alt="Avatar"
                    width={48}
                    height={48}
                    className='rounded-full'/>
            </div>
            <div className="ml-4">
                <p>
                    <span className="font-bold">{tweet.author.name}</span>
                    <span className="text-gray-400 ml-2">@{tweet.author.username}</span>
                </p>
                <p>{tweet.title}</p>
                <Likes tweet={tweet} addOptimisticTweet={addOptimisticTweets} />
            </div>
        </div>
    )
    )
}