import { User, createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";

export default function NewTweet({user}: {user: User}) {

    // Se especifica 'use server' para que el formulario pueda usar action
    const addTweet = async (formData: FormData) => {
        'use server'
        const title = String(formData.get('title'));
        const supabase = createServerActionClient<Database>({cookies});

            await supabase.from("tweets").insert({title, user_id: user.id});



    }

    return (
        <form className="border border-gray-300 border-t-0" action={addTweet} autoComplete="off">
            <div className="flex py-8 px-4">
            <div className="h-12 w-12">
                <Image src={user.user_metadata.avatar_url} alt="Avatar" className="rounded-full" width={48} height={48} />
            </div>
            <input type="text" name="title" placeholder="¿Qué estás pensando?" className="flex-1 bg-inherit ml-2 text-2xl leading-loose placeholder-gray-400 px-4"/>
            </div>
        </form>
    )
}