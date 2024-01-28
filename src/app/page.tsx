import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import formatTweetDate from '@/utils/format-tweet-date';
import { Navbar, NewTweet, Tweets } from './components';
/*
  Home es una página que se renderiza en el servidor, por lo que es posible usar async/await y mostrar los datos obtenidos de inmediato
*/
export default async function Home() {
  /*
  *   1. Obtener la sesión del usuario
  */
  cookies().getAll();
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  /*
  *   2. Comprobar si el usuario tiene username creado, sino, redirigir a la página de creación de username
  */
  const userLoggedHasUsername = await supabase.from('profiles').select('username').eq('id', session.user.id);

  if (!userLoggedHasUsername) {
    redirect("/account");
  }

  /*
  *   3. Obtener los tweets de la base de datos
  */
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
      <Navbar session={ session } />
      <div className='w-full max-w-xl mx-auto'>
        <NewTweet user={session.user} />
        <Tweets tweets={tweets} />
      </div>
    </>
  )
}
