'use server';

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { getErrorMessage } from "../components/get-error-message";
import { cookies } from "next/headers";

export const changeAccountInformation = async (formData: FormData) => {
	const supabase = createServerComponentClient<Database>({ cookies });
	const { data: {session} } = await supabase.auth.getSession();

	const username = formData.get("nickname")?.toString() ?? "";

	if (!username) {
		return { error: "El campo esta vacio" }
	}

    
	try{
		const { data, error } = await supabase.from("profiles").update({ username: username }).eq("id", session?.user.id).select();

		if (error) {
			return { error: getErrorMessage(error) }
		}

		if (data.length === 0) {
			return { error: "No hubo respuesta del servidor" }
		}

		return { data };

	}catch (error){
		return { error: getErrorMessage(error) }
	}

}