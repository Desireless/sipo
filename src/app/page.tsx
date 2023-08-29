import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import AuthButtonServer from './auth-button-server';
import { redirect } from 'next/navigation';
import NewTweet from './components/new-tweet';
import Tweets from './components/tweets';
import Link from 'next/link';
import formatTweetDate from '@/utils/format-tweet-date';
/*
  Home es una página que se renderiza en el servidor, por lo que es posible usar async/await y mostrar los datos obtenidos de inmediato
*/
export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    redirect("/login");
  }

  const { data } = await supabase.from('tweets').select('*, author: profiles(*), likes(user_id)').order('created_at', { ascending: false });

  const tweets = data?.map((tweet) => ({
    ...tweet,
    author: Array.isArray(tweet.author) ? tweet.author[0] : tweet.author,
    user_has_liked_tweet: !!tweet.likes.find((like) => like.user_id === session.user.id),
    likes: tweet.likes.length,
    created_at: formatTweetDate(tweet.created_at)
  }
  )) ?? [];


  return (
    <div className='w-full max-w-xl mx-auto'>
      <nav className='flex justify-between px-4 py-6 border border-gray-300 border-t-0'>
        <Link href='/account' className='text-xl font-bold hover:text-gray-600'>@{String(session.user.user_metadata.name)}</Link>

        <div>
          <Link href='/account' className='text-sm text-gray-600 hover:text-black mx-2'>Cuenta</Link>

          <AuthButtonServer />
        </div>
      </nav>
      <NewTweet user={session.user} />
      <Tweets tweets={tweets} />
    </div>
  )
}
