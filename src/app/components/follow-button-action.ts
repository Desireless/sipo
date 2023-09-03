'use server';

import { getErrorMessage } from "@/utils";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const followUser = async (user_id_to_follow: string) => {
    const supabase = createServerComponentClient<Database>({ cookies });
    const { data: { session } } = await supabase.auth.getSession();

    if (!user_id_to_follow) return { error: "ID de usuario vacio" };
    if (!session?.user.id) return { error: "Ha ocurrido un error en la sesión" };
    if (user_id_to_follow === session?.user.id) return { error: "No puedes seguirte a ti mismo" };


    try {
        const { data, error } = await supabase
            .from('followers')
            .insert([
                { follower_id: session?.user.id, following_id: user_id_to_follow },
            ])
            .select()


        if (error) {
            return { error: getErrorMessage(error) }
        }

        if (data.length === 0) {
            return { error: "No hubo respuesta del servidor" }
        }

        return { data };

    } catch (error) {
        return { error: getErrorMessage(error) }
    }

}