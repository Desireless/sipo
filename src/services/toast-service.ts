import {toast } from 'react-toastify';

export default class ToastService {
    static success(message: string) {
        toast.success(message,{
            position: "bottom-right",
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
        });
    }

    static error(message: string) {
        toast.error(message,{
            position: "bottom-right",
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
        });
    }

    static warning(message: string) {
        toast.warning(message,{
            position: "top-center",
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
        });
    }

}