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

La base SQLite se crea automaticamente[^1] en: 
[^1]: (En este caso la subimos solo para que haya mas productos. Por eso no esta en .gitignore).

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

Las rutas protegidas usan:

```txt
Authorization: Bearer TOKEN
```
