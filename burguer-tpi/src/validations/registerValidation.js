import { validateLogin } from "./loginValidation";

export const validateRegister = (form) => {
    const errors = validateLogin(form);

    if (!form.name.trim()) {
        errors.name = "El nombre es obligatorio";
    }

    if (!form.lastName.trim()) {
        errors.lastName = "El apellido es obligatorio";
    }

    if (!form.phone.trim()) {
        errors.phone = "El teléfono es obligatorio";
    }

    if (!form.address.trim()) {
        errors.address = "La dirección es obligatoria";
    }

    return errors;
};
