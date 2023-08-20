'use client'

import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from 'next/navigation';
import GithubButton from "./login/github-button";

export default function AuthButtonClient({ session }: { session: Session | null }) {
    const supabase = createClientComponentClient<Database>();
    const router = useRouter();


    // Debido que Home es ServerComponent no es posible usar useEffect, por lo que se usa el hook useRouter para refrescar la página
    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.refresh();
    }


    return session ? (
        <button className="text-sm text-gray-600 hover:text-black" onClick={handleSignOut}> Desconectarse</button>
    ) : (<GithubButton />)
}