// utils/notifications.js

import { Bounce, toast } from "react-toastify";

const defaultNotificationConfig = {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
};

export const successToast = (message, config) => {
    return toast.success(message, {
        ...defaultNotificationConfig,
        ...config,
    });
};

export const errorToast = (message, config) => {
    return toast.error(message, {
        ...defaultNotificationConfig,
        ...config,
    });
};

export const infoToast = (message, config) => {
    return toast.info(message, {
        ...defaultNotificationConfig,
        ...config,
    });
};
