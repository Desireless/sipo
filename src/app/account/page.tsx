import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AccountInfoForm } from "./account-info-form";


export default async function Account() {
    cookies().getAll();
    const supabase = createServerComponentClient<Database>({ cookies });
    const { data: { session } } = await supabase.auth.getSession();

    let name: string | null = null;  // Declaración inicial con null o un string válido
    let username: string | null = null;
    let avatar_url = '';

    if (!session) {
        redirect("/login");
    }
    // Agrega .Single() para que solo devuelva un objeto
    const { data } = await supabase.from('profiles').select('*, name, username, avatar_url').eq('id', session.user.id).single();

    if (data) {
        name = data.name;
        username = data.username;

        if(name === null){
            name = '';
        }

    }else{
        redirect("/login");
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center w-full">
            <div className="flex flex-col items-center justify-center border-solid border-gray-300 border rounded-xl px-12 py-7 gap-2">
                <h1 className="text-3xl font-bold mb-4">Cuenta</h1>


                <div className="flex flex-col w-[300px]">
                    <p className="block mb-1 text-lg font-bold text-gray-500 ">Nombre</p>
                    <input value={name} type="text" autoComplete="off" disabled className="px-4 py-2 mb-3 border border-solid border-gray-400 rounded-lg text-gray-400"/>
                </div>

                <AccountInfoForm username={username} />

                <div className="flex justify-start min-w-full gap-4 mt-4">

                    <Link href='/' className='flex items-center bg-black rounded-lg transition duration-200 hover:bg-slate-900 text-white font-bold px-4 py-2'>Home</Link>

                </div>



            </div>

        </div>
    );
}