// utils/notifications.js

import { Bounce, toast } from "react-toastify";
import error from "../../assets/error3.png";
import success from "../../assets/success.png";

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

const toastIconStyle = {
    width: "25px",
    height: "25px",
    objectFit: "contain",
};

export const successToast = (message, config) => {
    return toast.success(message, {
        ...defaultNotificationConfig,
        icon: (
            <img
                src={success}
                alt="success"
                style={toastIconStyle}
            />
        ),
        ...config,
    });
};

export const errorToast = (message, config) => {
    return toast.error(message, {
        ...defaultNotificationConfig,
        icon: (
            <img
                src={error}
                alt="error"
                style={toastIconStyle}
            />
        ),
        ...config,
    });
};

export const infoToast = (message, config) => {
    return toast.info(message, {
        ...defaultNotificationConfig,
        ...config,
    });
};
