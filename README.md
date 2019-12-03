# Recetas

En el ejercicio de hoy sacaremos el chef que llevamos dentro.


## Introducción. 

En el archivo `recipes.json` encontraréis un json con algunas recetas. Este archivo será editado a lo largo de la práctica. 

## Requisitos:

```
  - Haz fork del repositorio. 
  - Clona el repositorio. 

```
Dentro del proyecto:

```
  - Inicializa npm
  - Instala express
  - Añade un app.js
  - Crea un servicio que escuche en el puerto 3000
  - Crea un archivo methods.js que contenga las funciones que utilizaremos en cada uno de los endpoints. Expórtalas e impórtalas en el app.js.
  
```


## Iteración 1: getRecipes

Crea un endpoint que recoja __todas__ las recetas disponibles.
Deberá devolver un json con todas las recetas que estén el el archivo `recipes.json`

## Iteración 2: getRecipesById

Crea un endpoint que recoja la receta por __id__.

## Iteración 3: addNewRecipe

Crea un endpoint que permita __añadir__ una nueva receta a la lista de recetas. 

El cuerpo (body) de la llamada deberá contener el siguiente esquema: 
```
    {
      title,
      level,
      ingredients,
      cuisine,
      dishType,
      image,  (url de una imagen)
      duration,
      creator,
    }
```

Se deberá modificar el archivo `recipes.json` de manera que se añada la nueva receta al json. 

Dado que más adelante podremos buscar por id, deberemos asignarle una id a nuestra receta. Esta id corresponderá con la posición del array en la que se encuentra __+1__ (de esta forma, el primer objeto del array tendrá la id = 1)

## BONUS 1: updateRecipe

Crea un método que permita editar cada una de las recetas una por una.

En el cuerpo de la llamada, además de los elementos del objeto que queramos editar, habrá que proporcionar la id de la receta que se quiere editar para poder buscar por ella. 

## BONUS 2: deleteRecipe

A veces una receta no funciona: exceso de sal, las setas que hemos utilizado son venenosas... 
Cuando esto pasa, lo mejor es eliminar la receta antes de que nuestros clientes nos demanden. 

Crea un endpoint que elimine una receta a través de su id.


## BONUS 3: Validaciones.

No queremos que nuestra "base de datos" sea un verdadero caos. 

Añade validaciones a los endpoints para exigir que la información que nos venga sea la que nos tiene que llegar. 

Se deberán gestionar los errores para estos casos: 


```
- Si no se han enviado los parametros o cuerpo oportunos, devolveremos un error 422 (bad parameters)
- En caso de buscar una receta que no existe, devolveremos un 404 (not found)

```
Añade tantas validaciones adicionales como consideres oportuno para mantener a salvo nuestra "base de datos".

### HAPPY CODING ! :pizza:

