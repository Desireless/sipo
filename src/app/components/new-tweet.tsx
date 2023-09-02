'use client'
import { User, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import {  useRef } from "react";
import {toast } from 'react-toastify';
import UserAvatar from "./avatar";
import { ToastService } from "@/services";


export default function NewTweet({user}: {user: User}) {
    const supabase = createClientComponentClient<Database>();
    const inputRef = useRef<HTMLInputElement | null>(null);

    const addTweet = async (tweet: string) => {
        const ok = await supabase.from("tweets").insert({title: tweet, user_id: user.id});

        if(ok.error === null){ 
            ToastService.success("Mensaje enviado");
        }else{
            ToastService.error("Error al enviar el mensaje");
        }

    }

    const onKeyPress = (key: string) => {
        if (key !== 'Enter') return;
        if (!inputRef.current) return;

        if(inputRef.current.value.trim() === ''){
            ToastService.warning("El mensaje no puede estar vacío");
            return;
        }
        addTweet(inputRef.current.value);
        inputRef.current.value = '';
    };

    return (
        <div className="border border-gray-300 border-t-0 hover:bg-white">
            <div className="flex py-8 px-4">
            <div className="h-12 w-12">
                <UserAvatar avatarUrl={user.user_metadata.avatar_url} resolution="medium" />
            </div>
            <input type="text" name="title" autoComplete="off" ref={inputRef} maxLength={250} onKeyDown={
                (event) => {
                    onKeyPress(event.key);
                }
             }  placeholder="¿Qué estás pensando?" className="flex-1 bg-inherit ml-2 text-2xl leading-loose placeholder-gray-400 px-4"/>
            </div>
        </div>
    )
}