'use client';

import { useState } from "react";
import { toast } from "react-toastify";
import { changeAccountInformation } from "./change-account-info-action";

export const AccountInfoForm = ({ username }: { username: string }) => {
	const [error, setError] = useState('');
	const [inputValue, setInputValue] = useState('');

	async function clientAction(formData: FormData) {
		const reg = /^[0-9a-zA-Z]+$/;

		if (inputValue.length < 3) {
			toast.warning("El nick debe tener al menos 3 caracteres");
			return;
		}

		if (inputValue.length > 25) {
			toast.warning("El nick debe tener menos de 25 caracteres");
			return;
		}


		if (!reg.test(inputValue)) {
			toast.warning("El nick solo puede contener letras y números");
			return;
		}

		const result = await changeAccountInformation(formData);
		if (result?.error) {
			toast.error(result.error)
		} else {
			toast.success("Nickname cambiado correctamente");
		}

		resetInputValue();

	}

	const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	}

	const resetInputValue = () => {
		setInputValue('');
	}


	return (
		<form action={clientAction} className="group flex flex-col w-[300px] " id="user-information-form">

			<label className="block mb-1 text-lg font-bold text-gray-500 group-hover:text-black">Nick @{username}</label>
			<input type="text" value={inputValue} onChange={handleInputValue} name="nickname" className="px-4 py-2 mb-3 border border-solid border-gray-400 rounded-lg group-hover:border-black" maxLength={25} autoComplete="off" placeholder="Nuevo nick..." required />
			<button className="bg-green-600 rounded-lg transition duration-200 hover:bg-green-500 px-4 py-2 text-white font-semibold "> Cambiar </button>

			{
				error && (<p className="text-red-500">{error}</p>)
			}
		</form>
	)
}