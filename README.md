# dede_es3a_bis2

[![Actions Status](https://github.com/pglez82/asw2122_0/workflows/CI%20for%20ASW2122/badge.svg)](https://github.com/pglez82/asw2122_0/actions)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=pglez82_asw2122_0&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=pglez82_asw2122_0)
[![codecov](https://codecov.io/gh/pglez82/asw2122_0/branch/master/graph/badge.svg?token=VN4XG9NTRO)](https://codecov.io/gh/pglez82/asw2122_0)

<h1>
 ¡Tu tienda de playeros!
</h1>

Accesos rápidos
* [Wiki](https://github.com/Arquisoft/dede_es3a_bis2/wiki)
* [Decisiones arquitectónicas] 
* [Issues](https://github.com/Arquisoft/dede_es3a_bis2/issues)
* [Despliegue](https://dede-es3a-bis2.herokuapp.com/)
* [Documentación]
* [Presentación](https://unioviedo-my.sharepoint.com/:p:/g/personal/uo270149_uniovi_es/ER2xMsBN7pNMoVWYBRidYX0BmZuvGoTxUGiVaqTuipoShg?e=o4GXwT)

<p float="left">
<img src="https://blog.wildix.com/wp-content/uploads/2020/06/react-logo.jpg" height="100">
<img src="https://miro.medium.com/max/1200/0*RbmfNyhuBb8G3LWh.png" height="100">
<img src="https://miro.medium.com/max/365/1*Jr3NFSKTfQWRUyjblBSKeg.png" height="100">
</p>

Este proyecto es un ejemplo básico de un sitio web utilizando **React** con **Typescript** y un endpoint usando **NodeJS** con **express**
## Miembros del equipo
>* Sofía Suárez Fernández - UO270149@uniovi.es

## Guia de inicio rápido

<mark>Si tienes instalados node.js y npm, asegúrate de actualizarlos antes de intentar construir las imágenes</mark>

Si quieres ejecutar el proyecto necesitarás [git](https://git-scm.com/downloads), [Node.js and npm](https://www.npmjs.com/get-npm) y [Docker](https://docs.docker.com/get-docker/). Asegúrate de tenerlos instalados en tu equipo. Descarga el proyecto con `git clone https://github.com/pglez82/asw2122_0`. La manera más rápìda de ejecutar todo es con Docker.

```bash
docker-compose up --build
```
Este comando creará dos imagenes de docker si no existen en tu equipo (la webapp y la restapi) y lanzará un contenedor de mongoDB. Además lanzará contenedores de Prometheus y Grafana para monitorizar el servicio web. Deberias ser capaz de acceder a todo desde aqui:

 - [Webapp - http://localhost:3000](http://localhost:3000)
 - [Ejemplo llamada a RestApi - http://localhost:5000/api/users/list](http://localhost:5000/api/users/list)
 - [Metricas RestApi - http://localhost:5000/metrics](http://localhost:5000/metrics)
 - [Servidor Prometheus - http://localhost:9090](http://localhost:9090)
 - [Servidor Grafana http://localhost:9091](http://localhost:9091)
 
Si quieres ejecutar el proyecto sin Docker primero complila y ejecuta la restapi:

```shell
cd restapi
npm install
npm start
```
a continuación la webapp:
```shell
cd webapp
npm install
npm start
```

Deberías ser capaz de acceder a la aplicación en [http://localhost:3000](http://localhost:3000).

## Mas información
Encontrarás más información sobre el repositorio en los otros archivos README:
- Documentación: https://github.com/Arquisoft/dede_es3a/tree/master/docs
- Webapp: https://github.com/Arquisoft/dede_es3a/tree/master/webapp
- Restapi: https://github.com/Arquisoft/dede_es3a/tree/master/restapi
