'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function Likes({ tweet, addOptimisticTweet }: { tweet: TweetWithAuthor; addOptimisticTweet: (tweet: TweetWithAuthor) => void }) {

    const router = useRouter();

    const handleLikes = async () => {
        const supabase = createClientComponentClient<Database>();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            if (tweet.user_has_liked_tweet) {
                addOptimisticTweet({ ...tweet, user_has_liked_tweet: false, likes: tweet.likes - 1 });
                await supabase.from('likes').delete().match({ user_id: user.id, tweet_id: tweet.id });
            } else {
                addOptimisticTweet({ ...tweet, user_has_liked_tweet: false, likes: tweet.likes + 1 });
                await supabase.from('likes').insert({ user_id: user.id, tweet_id: tweet.id });
            }

            router.refresh();
        }

    }

    return (
        <button onClick={handleLikes} className="group flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`group-hover:fill-red-600 group-hover:stroke-red-600 ${tweet.user_has_liked_tweet ? "fill-red-600 stroke-red-600" : "fill-none stroke-gray-400"}`}>

                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            <span className={`ml-2 text-sm group-hover:text-red-600 ${tweet.user_has_liked_tweet ? 'text-red-600' : 'text-gray-400'}`}>
                {tweet.likes}

            </span>

        </button>


    )
}