'use client'

import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from 'next/navigation';
import GithubButton from "./login/github-button";
import Image from 'next/image'

export default function AuthButtonClient({ session }: { session: Session | null }) {
    const supabase = createClientComponentClient<Database>();
    const router = useRouter();


    // Debido que Home es ServerComponent no es posible usar useEffect, por lo que se usa el hook useRouter para refrescar la página
    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.refresh();
    }


    return session ? (
            <button
                className="flex border-none rounded-lg text-center align-middle items-center" onClick={handleSignOut}>
                <Image
                    src="/logout-icon-black.svg"
                    alt="Log out Logo"
                    className="dark:invert"
                    width={28}
                    height={28}
                    priority
                />
            </button>
    ) : (<GithubButton />)
}