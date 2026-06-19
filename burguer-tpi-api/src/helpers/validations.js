export const validateLoginUser = ({ email, password }) => {
    if (!email || !password) {
        return { error: true, message: "Email y contraseña son obligatorios" };
    }

    return { error: false };
};

export const validateRegisterUser = ({ name, lastName, email, password }) => {
    if (!name || !lastName || !email || !password) {
        return {
            error: true,
            message: "Nombre, apellido, email y contraseña son obligatorios",
        };
    }

    return { error: false };
};

export const validateProduct = ({ name, detail, price }) => {
    if (!name || !detail || price === undefined) {
        return { error: true, message: "Nombre, detalle y precio son obligatorios" };
    }

    if (Number(price) <= 0) {
        return { error: true, message: "El precio debe ser mayor a cero" };
    }

    return { error: false };
};

export const validateOrderItems = (items) => {
    if (!Array.isArray(items) || items.length === 0) {
        return { error: true, message: "El pedido debe tener productos" };
    }

    for (const item of items) {
        if (!item.productId) {
            return { error: true, message: "Cada item debe tener un producto" };
        }

        if (!Number.isInteger(Number(item.quantity)) || Number(item.quantity) <= 0) {
            return { error: true, message: "La cantidad debe ser mayor a cero" };
        }
    }

    return { error: false };
};
