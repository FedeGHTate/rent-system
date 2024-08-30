# Rent System

_Sistema de seguimiento de alquileres_

Desarrollé un sistema que permite el seguimiento de alquileres, incluye:
* Creación y administración de alquileres ,servicios e inquilinos.
* Asignación de inquilinos a propiedades.
* Generación y exportación de facturas en formato CSV.

## Comenzando 🚀

_Descargue el repositorio mediante git_


### Pre-requisitos 📋

* Docker
* Archivo de configuración .env


## Despliegue 📦

* El archivo .env hay que colocarlo en la raiz del proyecto
* En la carpeta raiz del proyecto ejecutar el comando de docker ("docker compose up -d --build")

#### Configuración de .env

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `DB_MONGO_HOST` | `string` | **Requerido**. Ruta de la base de datos |
| `DB_MONGO_PORT` | `string` | **Requerido**. Puerto de la base de datos |
| `DB_MONGO_DATABASE` | `string` | **Requerido**. Nombre de la base de datos |
| `DB_MONGO_USERNAME` | `string` | **Requerido**. Usuario en la base de datos |
| `DB_MONGO_PASSWORD` | `string` | **Requerido**. Contraseña de la base de datos |
| `BACKEND_URL` | `string` | **Opcional**. Dirección dle servidor backend |


## Construido con 🛠️


* [Maven](https://maven.apache.org/) - Manejador de dependencias
* [Docker](https://docker.com/) - Usado para generar imagenes y containers


## Documentado con Swagger

* Ruta: "/swagger-ui.html"


## Tecnologías utilizadas

**Contenedores** : Docker

**Cliente:** React, NextJs, TailwindCSS

**Server:** Java, Spring(Spring boot, Spring core, Spring data)
