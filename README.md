<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<h1 align="center">🛍️ Teslo Shop API</h1>

<p align="center">
  API RESTful para e-commerce construida con NestJS, TypeORM y PostgreSQL
</p>

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
</p>

---

## 📋 Tabla de Contenidos

- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Ejecución](#-ejecución)
- [Uso de la API](#-uso-de-la-api)
- [Tecnologías](#-tecnologías)

---

## 🔧 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (v16 o superior)
- **Yarn** package manager
- **Docker** y **Docker Compose**
- **Git**

---

## 📦 Instalación

### 1️⃣ Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd teslo-shop
```

### 2️⃣ Instalar dependencias

```bash
yarn install
```

---

## ⚙️ Configuración

### 3️⃣ Configurar variables de entorno

Crea el archivo de variables de entorno a partir de la plantilla:

```bash
cp .env.template .env
```

Luego, abre el archivo `.env` y configura las siguientes variables según tu entorno:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=teslo_db
PORT=3001
```

> ⚠️ **Nota:** Asegúrate de cambiar los valores por los de tu entorno de desarrollo.

---

## 🚀 Ejecución

### 4️⃣ Levantar la base de datos

Inicia el contenedor de PostgreSQL con Docker Compose:

```bash
docker-compose up -d
```

Verifica que el contenedor esté corriendo:

```bash
docker ps
```

### 5️⃣ Ejecutar el seed de datos

Para poblar la base de datos con productos de ejemplo, ejecuta:

```bash
# Primero inicia la aplicación
yarn start:dev

# Luego, en otro terminal o navegador, accede a:
# http://localhost:3001/api/seed
```

O usa cURL desde la terminal:

```bash
curl http://localhost:3001/api/seed
```

### 6️⃣ Iniciar la aplicación en modo desarrollo

```bash
yarn start:dev
```

La API estará disponible en: **http://localhost:3001**

---

## 🎯 Uso de la API

### Endpoints principales

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/products` | Obtener todos los productos |
| GET | `/api/products/:id` | Obtener un producto por ID |
| POST | `/api/products` | Crear un nuevo producto |
| PATCH | `/api/products/:id` | Actualizar un producto |
| DELETE | `/api/products/:id` | Eliminar un producto |
| GET | `/api/seed` | Ejecutar seed de datos |

### Documentación Swagger

Una vez que la aplicación esté corriendo, puedes acceder a la documentación interactiva de la API en:

**http://localhost:3001/api**

---

## 🛠️ Tecnologías

Este proyecto fue construido con:

- **[NestJS](https://nestjs.com/)** - Framework de Node.js
- **[TypeScript](https://www.typescriptlang.org/)** - Lenguaje de programación
- **[TypeORM](https://typeorm.io/)** - ORM para TypeScript
- **[PostgreSQL](https://www.postgresql.org/)** - Base de datos
- **[Docker](https://www.docker.com/)** - Contenedorización
- **[class-validator](https://github.com/typestack/class-validator)** - Validación de DTOs
- **[class-transformer](https://github.com/typestack/class-transformer)** - Transformación de objetos

---

## 📝 Scripts Disponibles

```bash
# Desarrollo
yarn start:dev

# Producción
yarn build
yarn start:prod

# Tests
yarn test
yarn test:watch
yarn test:cov
```

---

<p align="center">
  Desarrollado con ❤️ usando NestJS
</p>
