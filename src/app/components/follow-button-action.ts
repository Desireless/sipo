'use server';
import { getErrorMessage } from "@/utils";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";


/*
*   Funcion para seguir o dejar de seguir a un usuario
*   @param user_id_to_follow: ID del usuario a seguir
*   @param is_follwing: booleano que indica si se quiere seguir o dejar de seguir
*/
export const followAction = async (user_id_to_follow: string, is_follwing: boolean) => {
    const supabase = createServerComponentClient<Database>({ cookies });
    const { data: { session } } = await supabase.auth.getSession();

    if (!user_id_to_follow) return { error: "ID de usuario vacio" };
    if (!session?.user.id) return { error: "Ha ocurrido un error en la sesión" };
    if (user_id_to_follow === session?.user.id) return { error: "No puedes seguirte a ti mismo" };


    try {
        const { data, error } = is_follwing ?
            await supabase
                .from('followers')
                .delete()
                .match({ follower_id: session?.user.id, following_id: user_id_to_follow })
            : await supabase
                .from('followers')
                .insert([
                    { follower_id: session?.user.id, following_id: user_id_to_follow },
                ])
                .select();


        if (error) {
            return { error: getErrorMessage(error) }
        }

        if (data?.length === 0) {
            return { error: "No hubo respuesta del servidor" }
        }

        return { data };

    } catch (error) {
        return { error: getErrorMessage(error) }
    }

}