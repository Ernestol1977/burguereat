import bcrypt from "bcryptjs";
import { Product, User } from "../models/index.js";

export const seedDatabase = async () => {
    const userCount = await User.count();

    if (userCount === 0) {
        const password = await bcrypt.hash("Admin123!", 10);

        await User.bulkCreate([
            {
                name: "Super",
                lastName: "Admin",
                address: "Sistema",
                phone: "0000000000",
                email: "super@burgereat.com",
                password,
                role: "super-admin",
            },
            {
                name: "Dueño",
                lastName: "Admin",
                address: "BurgerEat",
                phone: "1111111111",
                email: "admin@burgereat.com",
                password,
                role: "admin",
            },
            {
                name: "Cliente",
                lastName: "Demo",
                address: "San Martin 123",
                phone: "2222222222",
                email: "cliente@burgereat.com",
                password,
                role: "usuario",
            },
        ]);
    }

    const productCount = await Product.count();

    if (productCount === 0) {
        await Product.bulkCreate([
            {
                name: "Hamburguesa Clasica",
                detail: "Carne vacuna, lechuga, tomate y aderezo.",
                price: 8000,
                img: "https://foodish-api.com/images/burger/burger50.jpg",
                alt: "Hamburguesa Clasica",
            },
            {
                name: "Cheese Burger",
                detail: "Carne vacuna, cheddar y bacon.",
                price: 9000,
                img: "https://foodish-api.com/images/burger/burger1.jpg",
                alt: "Cheese Burger",
            },
        ]);
    }
};
