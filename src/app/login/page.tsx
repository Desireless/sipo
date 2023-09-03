import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AuthButtonClient from "../components/auth-button-client";
import GithubButton from "./github-button";
import GoogleButton from "./google-button";

export default async function Login() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    redirect('/');
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center border-solid border-gray-300 border rounded-xl px-12 py-7">
        <h1 className="text-3xl font-bold mb-4">Iniciar sesión</h1>
        <span className="mt-2">

        <GithubButton />
        </span>

        <span className="mt-2">
        <GoogleButton />

        </span>
      </div>
    </div>
  );
}