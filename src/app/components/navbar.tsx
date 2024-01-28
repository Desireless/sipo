import { Session, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from 'react'
import Link from 'next/link';
import LogoutButtonClient from './logout-button-client';
import { cookies } from "next/headers";

export default async function Navbar({ session }: { session: Session | null }) {
    cookies().getAll();
    const supabase = createServerComponentClient<Database>({ cookies });
    const {data} = await supabase.from('profiles').select('username').eq('id', session?.user.id).single();
    return (
        <nav className='border border-gray-300 border-t-0 border-l-0 border-r-0 px-4 py-3 flex justify-between items-center'>
            {/* WEB NAME */}
            <div>
                <Link href="/">
                    <p className='font-bold'>SIPO</p>
                </Link>
            </div>

            {/* NAVIGATION BAR */}
            <div className='flex flex-row gap-4'>
                <Link href='/' className='text-slate-600 hover:text-black'>Inicio</Link>
                
                {
                    !!data?.username?.length && (
                        <Link href={`/${data.username}`} className='text-slate-600 hover:text-black' >Perfil</Link>
                    )
                }

                <Link href='/account' className='text-slate-600 hover:text-black'>Cuenta</Link>
                <LogoutButtonClient />
            </div>
        </nav>
    )
}

