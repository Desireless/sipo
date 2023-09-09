'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from 'next/navigation';
import Image from 'next/image'

export default function LogoutButtonClient() {
    const supabase = createClientComponentClient<Database>();
    const router = useRouter();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.refresh();
    }


    return (
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
    )
}