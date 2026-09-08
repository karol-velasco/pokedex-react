# Pokédex React

## Objetivo del proyecto

El objetivo de este proyecto es crear una aplicación en React que permita consultar información de Pokémon usando una API externa y también crear un equipo Pokémon usando una API local. Con este proyecto practiqué el consumo de APIs y las operaciones básicas de un CRUD.

## Tecnologías utilizadas

* React
* JavaScript
* Vite
* HTML y CSS
* Fetch
* PokéAPI
* JSON Server

## PokéAPI

PokéAPI es una API externa que utilizo para consultar información real de los Pokémon. En el proyecto puedo buscar un Pokémon por su nombre o número y mostrar algunos de sus datos, como su nombre, imagen, altura y peso.

La consulta a PokéAPI se realiza principalmente utilizando el método **GET**, ya que solamente estamos consultando información.

## JSON Server

JSON Server se utiliza como una API local para practicar las operaciones CRUD. En este proyecto sirve para guardar los Pokémon que agrego a mi equipo y poder consultarlos, modificarlos o eliminarlos.

Los datos se guardan en el archivo db.json.

## Explicación 

* GET:sirve para consultar o traer información. Lo utilizo para mostrar los Pokémon de mi equipo.
* POST:sirve para crear información nueva. Lo utilizo para agregar un Pokémon a mi equipo.
* PATCH: sirve para modificar información. Lo utilizo para cambiar el nivel o marcar un Pokémon como favorito.
* DELETE:sirve para eliminar información. Lo utilizo para liberar un Pokémon de mi equipo.

## Instrucciones

* npm install: Instalar las dependencias del proyecto

* npm run dev: Para iniciar la aplicación de React

* npm run api: Para iniciar la API local con JSON Server

