import React from 'react'
import AuthButtonServer from '../auth-button-server';
import Link from 'next/link';

type NavbarProps = {
    username: string;
}

export default function Navbar( {username}: NavbarProps ) {
    return (
        <nav className='border border-gray-300 border-t-0 border-l-0 border-r-0 px-4 py-3 flex justify-between'>
            {/* WEB NAME */}
            <div>
                <p className='font-bold'>SIPO</p>
            </div>

            {/* NAVIGATION BAR */}
            <div className='flex flex-row gap-4'>
                <p className='font-semibold'>Hola @{username}</p>
                <Link href='/account' >Perfil</Link>
                <AuthButtonServer />
            </div>
        </nav>
    )
}

