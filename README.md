# Challenge Disruptive

# **¿Como runear?**

- **Clonar**

``` bash
git clone https://github.com/SMNahuel/Disruptive.git
```

- **Instalar paquetes**

``` bash
cd Disruptive && cd client && npm i && cd ../api && npm i && npm start
```
> [!NOTE]
> 
>- **Iniciar el server en nodejs primero para evitar usar otro puerto**






# **Puntos cumplidos:**

## **Contenidos**

- Crear contenidos que contegan texto + VideoURL + Image
- Actualizar el texto del contenido (no se puede modificar el contenido multimedia)
- Borrar el contenido (Solo el ADMIN)

## **Autenticacion**

- Registro de usuarios (Lector - Creador) Admin de manera manual.
- Login de usuarios

## **Tematicas y categorias**

- Creacion y eliminacion de **_categorias_**
- Creacion y eliminacion de **_tematicas_**

## **Usuario Admin de prueba**

    - admin@secure.com
    - Develop123!

## **Autorización**

- Middleware para poder proteger ciertas rutas de usuarios sin privilegios.