# Nodepop

Desarrollo de un API que se ejecutará en el servidor de un servicio de venta de articulos de segunda mano.Para ser utilizada por desarrolladores de iOS o Android

Para arrancar el proyecto en modo desarrollo usamos en la terminal el siguiente comando :

```sh
npm run dev
```

## Inicializar la base de datos

```sh
npm run initDB
```

## Recordatorio de como se arranca MongoDB en Mac y Linux

Con la instalación .tar.gz puedes arrancar con este comando:

```sh
/bin/mongod --dbpath ./data/db
```

## Rutas del API

- Para obtener una lista de anuncios o productos:

```sh
http://127.0.0.1:3200/api/announcements/
```

## Filtrado

**name** : Obtiene el nombre del prodcuto que queremos buscar en la API, es una expresión regular

**_Ejemplo:_**

```sh
http://127.0.0.1:3200/api/announcements/?name=<que producto queremos buscar>
```

**Sale** : Con una condición nos indica que si el producto esta en venta o en compra, tipo booleam

**_Ejemplo:_**

```sh
http://127.0.0.1:3200/api/announcements/?sale=<true o false>
```

**price** : Nos entrega la existencia de un valor que se encuentra en la API

**_Ejemplo:_**

```sh
http://127.0.0.1:3200/api/announcements/?price=<valor a buscar>
```

**tags** : Nos muestra la eqtiqueta o categoria con la que esta definida el producto

**_Ejemplo:_**

```sh
http://127.0.0.1:3200/api/announcements/?tags=<que queremos buscar>
```

- **Sort** : Permite ordenar por valor de orden descendiente o decreciente

**_Ejemplo:_**

```sh
http://127.0.0.1:3200/api/announcements/?sort=price <forma decreciente>
```

```sh
http://127.0.0.1:3200/api/announcements/?sort=-price <forma descendiente>
```

## Páginación

**skip** : Salta productos, de las cuales tenemos en la base de datos

**_Ejemplo:_**

```sh
http://127.0.0.1:3200/api/announcements/?sort=1
```

**limit** : Nos va a limitar los productos, según lo que le indiquemos

**_Ejemplo:_**

```sh
http://127.0.0.1:3200/api/announcements/?limit=1
```
