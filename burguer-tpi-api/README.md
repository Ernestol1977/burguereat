# Burguer API

Backend API para el proyecto Burguer usando Node.js, Express, SQLite y Sequelize.

## Instalación

Desde la carpeta `burguer-tpi-api`:

```powershell
npm install
```

## Ejecutar en desarrollo

```powershell
npm run dev
```

El servidor quedará disponible en `http://localhost:3001`.

## Endpoints

- `GET /api` - estado del servidor
- `GET /api/products` - lista de productos
- `GET /api/products/:id` - producto por id
- `POST /api/products` - crear producto
- `PUT /api/products/:id` - actualizar producto
- `DELETE /api/products/:id` - eliminar producto

## Base de datos

La base de datos SQLite se guarda en `database.sqlite` y se crea automáticamente en el primer arranque.

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
