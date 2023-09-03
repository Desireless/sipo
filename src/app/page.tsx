import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import formatTweetDate from '@/utils/format-tweet-date';
import { Navbar, NewTweet, Tweets } from './components';
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
    <>
      <Navbar username={String(session.user.user_metadata.name)}/>
      <div className='w-full max-w-xl mx-auto'>
        <NewTweet user={session.user} />
        <Tweets tweets={tweets} />
      </div>
    </>
  )
}
