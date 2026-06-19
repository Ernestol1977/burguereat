# BurgerEat API

Backend simple para el TPI de Programacion III.

## Comandos

```powershell
npm install
npm start
```

El servidor queda en:

```txt
http://localhost:3001
```

## Base de datos

La base SQLite se crea automaticamente en:

```txt
src/database/burgereat.sqlite
```

Ese archivo se puede abrir con DBeaver usando una conexion SQLite.

## Usuarios de prueba

Todos usan password:

```txt
Admin123!
```

```txt
super@burgereat.com     super-admin
admin@burgereat.com     admin
johnniew@burgereat.com  usuario
```
<!-- 
## Endpoints principales

```txt
GET  /api

POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me

GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id

GET    /api/users
GET    /api/users/:id
POST   /api/users
PUT    /api/users/:id
PUT    /api/users/:id/role
DELETE /api/users/:id

GET    /api/orders
GET    /api/orders/my-orders
POST   /api/orders
PUT    /api/orders/:id/status
DELETE /api/orders/:id
``` -->

Las rutas protegidas usan:

```txt
Authorization: Bearer TOKEN
```
