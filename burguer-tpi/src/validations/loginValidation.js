export const validateLogin = (form) => {
    const errors = {};

    if (!form.email.trim()) {
        errors.email = "El email es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
        errors.email = "Formato inválido";
    }

    if (!form.password.trim()) {
        errors.password = "La contraseña es obligatoria";
    } else {
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,20}$/;

        if (!passwordRegex.test(form.password)) {
            errors.password = `La contraseña debe tener:
                8-20 caracteres,
                una mayúscula,
                una minúscula,
                un número y
                un carácter especial`;
        }
    }

    return errors;
};
