# 💰 Registro Financiero - Financial Tracking Application

[![NestJS](https://img.shields.io/badge/NestJS-v11.0-E0234E?style=flat-square&logo=nestjs)](https://nestjs.com/)
[![Next.js](https://img.shields.io/badge/Next.js-v16.2-000000?style=flat-square&logo=next.js)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-v6.19-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=flat-square&logo=json-web-tokens)](https://jwt.io/)
[![License](https://img.shields.io/badge/License-UNLICENSED-red?style=flat-square)](LICENSE)

## 📋 Tabla de Contenidos

- [Descripción](#descripción)
- [Características](#características)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Scripts Disponibles](#scripts-disponibles)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Arquitectura](#arquitectura)
- [Endpoints API](#endpoints-api)
- [Autenticación](#autenticación)
- [Modelos de Datos](#modelos-de-datos)
- [Seguridad](#seguridad)
- [Deployment](#deployment)
- [Mejoras Futuras](#mejoras-futuras)
- [Recomendaciones Técnicas](#recomendaciones-técnicas)
- [Contribución](#contribución)

---

## 📌 Descripción

**Registro Financiero** es una aplicación full-stack de gestión financiera personal que permite a los usuarios rastrear sus gastos e ingresos de forma centralizada. La aplicación está diseñada con una arquitectura moderna, escalable y orientada a seguridad.

### Objetivo Principal

Proporcionar una herramienta intuitiva y segura para:

- 📊 Registrar y categorizar gastos e ingresos
- 💼 Organizar transacciones por categorías personalizadas
- 📈 Visualizar el balance financiero en tiempo real
- 🔐 Autenticación segura con JWT
- 🖼️ Soporte para imágenes en gastos

---

## ✨ Características

### Backend (API REST)

- ✅ **Autenticación JWT** - Seguridad mediante tokens Bearer
- ✅ **CRUD Completo** - Operaciones de creación, lectura, actualización y eliminación
- ✅ **Control de Acceso** - Aislamiento de datos por usuario (Row-Level Security)
- ✅ **Validación de Datos** - DTOs con decoradores de validación (`class-validator`)
- ✅ **Gestión de Categorías** - Categorías personalizadas por usuario
- ✅ **Documentación Swagger** - Documentación API automática e interactiva
- ✅ **CORS Configurado** - Soporte para múltiples orígenes
- ✅ **Manejo de Errores** - Excepciones personalizadas y mensajes claros
- ✅ **Base de Datos Normalizada** - Relaciones con eliminación en cascada y set null

### Frontend (Web App)

- ✅ **Interfaz Responsiva** - Diseño mobile-first con Tailwind CSS
- ✅ **Autenticación Context** - Gestión de estado de autenticación
- ✅ **Intercepción de Requests** - Inyección automática de tokens JWT
- ✅ **Formularios Reactivos** - Manejo eficiente de estados
- ✅ **Redirección Automática** - Redirige a login si el token expira
- ✅ **Manejo de Errores** - Mensajes de error claros y amigables
- ✅ **Server Components** - Optimización con Next.js App Router

---

## 🔧 Requisitos Previos

### Sistema Operativo

- Windows 10+ / macOS 10.15+ / Linux (Ubuntu 20.04+)

### Software Requerido

| Herramienta    | Versión Mínima | Descripción              |
| -------------- | -------------- | ------------------------ |
| **Node.js**    | 18.x LTS       | Runtime de JavaScript    |
| **npm**        | 9.x            | Gestor de paquetes       |
| **PostgreSQL** | 14+            | Base de datos relacional |
| **Git**        | 2.x            | Control de versiones     |

### Verificar Instalación

```bash
node --version    # v18.x.x
npm --version     # 9.x.x
psql --version    # PostgreSQL 14+
```

---

## 📥 Instalación

### 1️⃣ Clonar el Repositorio

```bash
git clone <repository-url>
cd "Registro financiero"
```

### 2️⃣ Instalar Dependencias del Backend

```bash
cd back
npm install
```

### 3️⃣ Instalar Dependencias del Frontend

```bash
cd ../font
npm install
```

### 4️⃣ Configurar Base de Datos

```bash
cd ../back

# Crear base de datos PostgreSQL
createdb expense_tracker

# Ejecutar migraciones de Prisma
npx prisma migrate deploy

# (Opcional) Llenar con datos de prueba
npx prisma db seed
```

### 5️⃣ Iniciar la Aplicación

```bash
# Terminal 1 - Backend (puerto 3000)
cd back
npm run start:dev

# Terminal 2 - Frontend (puerto 3001)
cd font
npm run dev
```

La aplicación estará disponible en:

- 🖥️ Frontend: http://localhost:3001
- 🔌 Backend: http://localhost:3000
- 📚 Swagger API: http://localhost:3000/api

---

## ⚙️ Configuración

### Variables de Entorno - Backend

Crear archivo `.env` en la carpeta `back/`:

```env
# ============ BASE DE DATOS ============
DATABASE_URL="postgresql://user:password@localhost:5432/expense_tracker"

# ============ AUTENTICACIÓN JWT ============
JWT_SECRET="tu-secret-super-seguro-aqui-cambiar-en-produccion"
JWT_EXPIRATION="24h"

# ============ CLOUDINARY (Opcional) ============
CLOUDINARY_CLOUD_NAME="tu-cloud"
CLOUDINARY_API_KEY="tu-key"
CLOUDINARY_API_SECRET="tu-secret"

# ============ ENTORNO ============
NODE_ENV="development"
PORT=3000
```

### Variables de Entorno - Frontend

Crear archivo `.env.local` en la carpeta `font/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Referencia de Configuración

| Variable         | Descripción               | Ejemplo                                    |
| ---------------- | ------------------------- | ------------------------------------------ |
| `DATABASE_URL`   | Conexión PostgreSQL       | `postgresql://user:pass@localhost:5432/db` |
| `JWT_SECRET`     | Clave secreta para tokens | Mínimo 32 caracteres aleatorios            |
| `JWT_EXPIRATION` | Tiempo de expiración      | `24h`, `7d`, `30d`                         |
| `NODE_ENV`       | Entorno de ejecución      | `development` \| `production`              |
| `PORT`           | Puerto del servidor       | `3000`                                     |

---

## 🚀 Scripts Disponibles

### Backend

```bash
# Desarrollo con hot-reload
npm run start:dev

# Producción
npm run start:prod

# Compilación a JavaScript
npm run build

# Linting y formateo
npm run lint
npm run format

# Testing
npm test
npm run test:watch
npm run test:cov
npm run test:e2e

# Prisma
npx prisma migrate dev --name <nombre-migracion>
npx prisma migrate deploy
npx prisma studio  # GUI para la base de datos
```

### Frontend

```bash
# Desarrollo con hot-reload
npm run dev

# Compilación para producción
npm run build

# Ejecutar compilación
npm run start

# Linting
npm run lint
```

---

## 📁 Estructura del Proyecto

```
Registro financiero/
│
├── back/                                  # Backend API (NestJS)
│   ├── src/
│   │   ├── auth/                         # Módulo de autenticación
│   │   │   ├── auth.controller.ts        # Endpoints auth
│   │   │   ├── auth.service.ts           # Lógica autenticación
│   │   │   ├── auth.module.ts
│   │   │   ├── decorators/               # Custom decorators
│   │   │   │   └── current-user.decorator.ts
│   │   │   ├── dto/                      # DTOs (Data Transfer Objects)
│   │   │   │   ├── login.dto.ts
│   │   │   │   └── register.dto.ts
│   │   │   ├── guards/                   # Guards (JWT)
│   │   │   │   └── jwt.guard.ts
│   │   │   └── strategies/               # Passport strategies
│   │   │       └── jwt.strategy.ts
│   │   │
│   │   ├── categories/                   # Módulo de categorías
│   │   │   ├── categories.controller.ts
│   │   │   ├── categories.service.ts
│   │   │   ├── categories.module.ts
│   │   │   └── dto/
│   │   │       ├── create-category.dto.ts
│   │   │       └── update-category.dto.ts
│   │   │
│   │   ├── expenses/                     # Módulo de gastos
│   │   │   ├── expenses.controller.ts
│   │   │   ├── expenses.service.ts
│   │   │   ├── expenses.module.ts
│   │   │   ├── dto/
│   │   │   │   ├── create-expense.dto.ts
│   │   │   │   └── update-expense.dto.ts
│   │   │   └── filters/
│   │   │
│   │   ├── incomes/                      # Módulo de ingresos
│   │   │   ├── incomes.controller.ts
│   │   │   ├── incomes.service.ts
│   │   │   ├── incomes.module.ts
│   │   │   └── dto/
│   │   │       ├── create-income.dto.ts
│   │   │       └── update-income.dto.ts
│   │   │
│   │   ├── users/                        # Módulo de usuarios
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   └── users.module.ts
│   │   │
│   │   ├── config/                       # Configuración
│   │   │   └── prisma.service.ts
│   │   │
│   │   ├── common/                       # Código compartido
│   │   │   ├── decorators/
│   │   │   ├── filters/
│   │   │   ├── interceptors/
│   │   │   └── utils/
│   │   │
│   │   ├── app.module.ts                 # Módulo raíz
│   │   ├── app.controller.ts
│   │   ├── app.service.ts
│   │   └── main.ts                       # Punto de entrada
│   │
│   ├── prisma/
│   │   ├── schema.prisma                 # Definición de modelos
│   │   ├── migrations/                   # Historial de migraciones
│   │   └── seed.ts                       # Datos de prueba
│   │
│   ├── test/                             # Tests E2E
│   ├── package.json
│   ├── tsconfig.json
│   ├── eslint.config.mjs
│   ├── nest-cli.json
│   ├── .env.example
│   └── README.md
│
├── font/                                  # Frontend Web (Next.js)
│   ├── app/
│   │   ├── layout.tsx                    # Layout principal
│   │   ├── page.tsx                      # Página home
│   │   ├── globals.css                   # Estilos globales
│   │   ├── dashboard/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx                  # Dashboard principal
│   │   │   └── categories/
│   │   │       └── page.tsx              # Gestión de categorías
│   │   ├── login/
│   │   │   └── page.tsx                  # Página de login
│   │   └── register/
│   │       └── page.tsx                  # Página de registro
│   │
│   ├── context/
│   │   └── AuthContext.tsx               # Estado global de auth
│   │
│   ├── lib/
│   │   └── api.ts                        # Cliente HTTP (Axios)
│   │
│   ├── public/                           # Archivos estáticos
│   ├── package.json
│   ├── tsconfig.json
│   ├── eslint.config.mjs
│   ├── next.config.ts
│   ├── postcss.config.mjs
│   └── .env.local
│
└── README.md                              # Este archivo
```

---

## 🏗️ Arquitectura

### Patrón de Arquitectura: Modular + Servicios

```
┌─────────────────────────────────────────────────────────────┐
│                      PRESENTACIÓN                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Login      │  │  Dashboard   │  │  Categories  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────v────────────────────────────────────┐
│                   CONTEXTO (Auth)                           │
│           Gestión de token y estado global                 │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────v────────────────────────────────────┐
│                   CLIENTE HTTP (Axios)                      │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Interceptores                                      │   │
│  │  • Inyectar Bearer Token                            │   │
│  │  • Manejar 401 (Logout automático)                  │   │
│  └─────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP (REST)
┌────────────────────────v────────────────────────────────────┐
│                    API REST BACKEND                          │
│                                                              │
│  ┌──────────────┬──────────────┬──────────────────────┐   │
│  │  Controllers │  Services    │  Prisma ORM          │   │
│  ├──────────────┼──────────────┼──────────────────────┤   │
│  │ • Auth       │ • AuthSvc    │ • User              │   │
│  │ • Expenses   │ • ExpSvc     │ • Category          │   │
│  │ • Incomes    │ • IncSvc     │ • Expense           │   │
│  │ • Categories │ • CatSvc     │ • Income            │   │
│  │ • Users      │ • UserSvc    │                     │   │
│  └──────────────┴──────────────┴──────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────┐      │
│  │         Middlewares & Guards                     │      │
│  │  • ValidationPipe                               │      │
│  │  • JwtGuard                                      │      │
│  │  • CORS                                          │      │
│  └──────────────────────────────────────────────────┘      │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────v────────────────────────────────────┐
│              BASE DE DATOS POSTGRESQL                        │
│  ┌──────────────┬──────────────┬──────────────┐            │
│  │    users     │  categories  │  expenses    │            │
│  ├──────────────┼──────────────┼──────────────┤            │
│  │ id (PK)      │ id (PK)      │ id (PK)      │            │
│  │ email (UK)   │ name         │ amount       │            │
│  │ password     │ userId (FK)  │ date         │            │
│  │ createdAt    │              │ userId (FK)  │            │
│  │              │              │ categoryId   │            │
│  └──────────────┴──────────────┴──────────────┘            │
│                                                              │
│  ┌──────────────┐                                           │
│  │  incomes     │                                           │
│  ├──────────────┤                                           │
│  │ id (PK)      │                                           │
│  │ amount       │                                           │
│  │ date         │                                           │
│  │ userId (FK)  │                                           │
│  └──────────────┘                                           │
└────────────────────────────────────────────────────────────┘
```

### Flujo de Autenticación

```
1. REGISTRO
   Usuario → [POST /auth/register] → API
   ├─ Validar datos
   ├─ Hashear contraseña (bcrypt)
   ├─ Guardar en BD
   └─ Retornar JWT token

2. LOGIN
   Usuario → [POST /auth/login] → API
   ├─ Validar credenciales
   ├─ Generar JWT (sub: userId, email)
   └─ Retornar token + email

3. ACCESO A RECURSOS PROTEGIDOS
   Request → [Header: Authorization: Bearer {token}]
   ├─ JwtGuard intercepta
   ├─ JwtStrategy valida token
   ├─ Extrae userId del payload
   ├─ @CurrentUser() inyecta en controlador
   └─ Acceso concedido/denegado

4. EXPIRACIÓN
   Token expirado → API retorna 401
   ├─ Interceptor frontend detecta
   ├─ localStorage.removeItem('token')
   └─ Redirige a /login
```

---

## 🔌 Endpoints API

### Autenticación

#### 📝 Registrar Usuario

```http
POST /auth/register HTTP/1.1
Content-Type: application/json

{
  "email": "usuario@ejemplo.com",
  "password": "MiContraseña123"
}
```

**Respuesta (201 Created):**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "email": "usuario@ejemplo.com"
}
```

#### 🔐 Iniciar Sesión

```http
POST /auth/login HTTP/1.1
Content-Type: application/json

{
  "email": "usuario@ejemplo.com",
  "password": "MiContraseña123"
}
```

**Respuesta (200 OK):**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "email": "usuario@ejemplo.com"
}
```

---

### Gastos (Expenses)

#### ➕ Crear Gasto

```http
POST /expenses HTTP/1.1
Authorization: Bearer {token}
Content-Type: application/json

{
  "amount": 45.50,
  "description": "Compra en supermercado",
  "date": "2025-05-19",
  "categoryId": "cat-123-uuid",
  "imageUrl": "https://cloudinary.com/image.jpg"
}
```

**Respuesta (201 Created):**

```json
{
  "id": "exp-456-uuid",
  "amount": "45.50",
  "description": "Compra en supermercado",
  "date": "2025-05-19T12:00:00.000Z",
  "categoryId": "cat-123-uuid",
  "imageUrl": "https://cloudinary.com/image.jpg",
  "userId": "user-789-uuid",
  "createdAt": "2025-05-19T10:30:00.000Z",
  "updatedAt": "2025-05-19T10:30:00.000Z",
  "category": {
    "id": "cat-123-uuid",
    "name": "Alimentación",
    "description": "Gastos de comida"
  }
}
```

#### 📋 Obtener Todos los Gastos

```http
GET /expenses HTTP/1.1
Authorization: Bearer {token}
```

**Respuesta (200 OK):**

```json
[
  {
    "id": "exp-456-uuid",
    "amount": "45.50",
    "description": "Compra en supermercado",
    "date": "2025-05-19T12:00:00.000Z",
    "categoryId": "cat-123-uuid",
    "userId": "user-789-uuid",
    "category": {
      "id": "cat-123-uuid",
      "name": "Alimentación"
    }
  },
  {
    "id": "exp-789-uuid",
    "amount": "120.00",
    "description": "Gasolina",
    "date": "2025-05-18T12:00:00.000Z",
    "categoryId": "cat-456-uuid",
    "userId": "user-789-uuid",
    "category": {
      "id": "cat-456-uuid",
      "name": "Transporte"
    }
  }
]
```

#### 🔍 Obtener Gasto por ID

```http
GET /expenses/:id HTTP/1.1
Authorization: Bearer {token}
```

#### ✏️ Actualizar Gasto

```http
PATCH /expenses/:id HTTP/1.1
Authorization: Bearer {token}
Content-Type: application/json

{
  "amount": 50.00,
  "description": "Compra actualizada"
}
```

#### 🗑️ Eliminar Gasto

```http
DELETE /expenses/:id HTTP/1.1
Authorization: Bearer {token}
```

---

### Ingresos (Incomes)

#### ➕ Crear Ingreso

```http
POST /incomes HTTP/1.1
Authorization: Bearer {token}
Content-Type: application/json

{
  "amount": 1500.00,
  "description": "Salario mensual",
  "date": "2025-05-01"
}
```

**Respuesta (201 Created):**

```json
{
  "id": "inc-123-uuid",
  "amount": "1500.00",
  "description": "Salario mensual",
  "date": "2025-05-01T12:00:00.000Z",
  "userId": "user-789-uuid",
  "createdAt": "2025-05-19T10:30:00.000Z",
  "updatedAt": "2025-05-19T10:30:00.000Z"
}
```

#### 📋 Obtener Todos los Ingresos

```http
GET /incomes HTTP/1.1
Authorization: Bearer {token}
```

#### 🔍 Obtener Ingreso por ID

```http
GET /incomes/:id HTTP/1.1
Authorization: Bearer {token}
```

#### ✏️ Actualizar Ingreso

```http
PATCH /incomes/:id HTTP/1.1
Authorization: Bearer {token}
Content-Type: application/json

{
  "amount": 1600.00
}
```

#### 🗑️ Eliminar Ingreso

```http
DELETE /incomes/:id HTTP/1.1
Authorization: Bearer {token}
```

---

### Categorías (Categories)

#### ➕ Crear Categoría

```http
POST /categories HTTP/1.1
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Alimentación",
  "description": "Gastos en comida y bebidas"
}
```

**Respuesta (201 Created):**

```json
{
  "id": "cat-123-uuid",
  "name": "Alimentación",
  "description": "Gastos en comida y bebidas",
  "userId": "user-789-uuid",
  "createdAt": "2025-05-19T10:30:00.000Z",
  "updatedAt": "2025-05-19T10:30:00.000Z"
}
```

#### 📋 Obtener Todas las Categorías

```http
GET /categories HTTP/1.1
Authorization: Bearer {token}
```

#### 🔍 Obtener Categoría por ID

```http
GET /categories/:id HTTP/1.1
Authorization: Bearer {token}
```

#### ✏️ Actualizar Categoría

```http
PATCH /categories/:id HTTP/1.1
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Comida y Bebidas"
}
```

#### 🗑️ Eliminar Categoría

```http
DELETE /categories/:id HTTP/1.1
Authorization: Bearer {token}
```

---

### Códigos de Error HTTP

| Código  | Descripción  | Escenario                                 |
| ------- | ------------ | ----------------------------------------- |
| **200** | OK           | Solicitud exitosa                         |
| **201** | Created      | Recurso creado exitosamente               |
| **400** | Bad Request  | Datos inválidos o email duplicado         |
| **401** | Unauthorized | Token ausente, inválido o expirado        |
| **403** | Forbidden    | El usuario no tiene permisos para acceder |
| **404** | Not Found    | Recurso no encontrado                     |
| **500** | Server Error | Error interno del servidor                |

---

## 🔐 Autenticación

### Seguridad Implementada

#### 1. **Contraseñas Hasheadas con bcrypt**

```typescript
// En auth.service.ts
const hashedPassword = await bcrypt.hash(password, 10);
// 10 rounds de salt para mayor seguridad
```

#### 2. **JWT (JSON Web Tokens)**

```typescript
// Payload del token
{
  "sub": "user-id",
  "email": "usuario@ejemplo.com",
  "iat": 1234567890,
  "exp": 1234654290
}
```

**Características:**

- ✅ Expiración configurable (default: 24h)
- ✅ Firma con secreto seguro
- ✅ Validación en cada request protegido

#### 3. **Guards (JwtGuard)**

```typescript
@UseGuards(JwtGuard)
@Get()
findAll(@CurrentUser() user: { userId: string }) {
  return this.expensesService.findAll(user.userId);
}
```

#### 4. **Estrategia Passport JWT**

```typescript
const config = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  ignoreExpiration: false,
  secretOrKey: process.env.JWT_SECRET,
};
```

#### 5. **Aislamiento de Datos por Usuario**

```typescript
// Cada query filtra por userId del token
async findAll(userId: string) {
  return this.prisma.expense.findMany({
    where: { userId },  // ← Aislamiento de datos
    include: { category: true },
    orderBy: { date: 'desc' },
  });
}
```

### Cómo Autenticarse en Swagger

1. 📌 Ir a http://localhost:3000/api
2. 🔒 Hacer login en `/auth/login`
3. 📋 Copiar el token de respuesta
4. 🔓 Presionar botón "Authorize" (arriba a la derecha)
5. ✍️ Pegar el token en el formato: `Bearer {token}`
6. ✅ Ya tienes acceso a endpoints protegidos

---

## 📊 Modelos de Datos

### Diagrama ER

```
┌─────────────┐
│    users    │
├─────────────┤
│ id (PK)     │◄─────┐
│ email (UK)  │      │
│ password    │      │
│ createdAt   │      │
│ updatedAt   │      │
└─────────────┘      │
      │      │       │
      │      │       │
      │      └───┬───┘─────────┐
      │          │             │
      │     ┌────▼──────┐  ┌───▼───────┐
      │     │categories │  │ expenses  │
      │     ├───────────┤  ├───────────┤
      │     │ id (PK)   │  │ id (PK)   │
      │     │ name      │  │ amount    │
      │     │userId(FK) │  │ date      │
      │     │createdAt  │  │userId(FK) │◄───┐
      │     │           │  │categoryId │    │
      │     └───────────┘  │(FK, NULL)│    │
      │            ▲       │createdAt │    │
      │            │       └───┬──────┘    │
      │            └───────────┘           │
      │                                     │
      └──────────────┬──────────────────────┘
                     │
                ┌────▼──────┐
                │  incomes   │
                ├────────────┤
                │ id (PK)    │
                │ amount     │
                │ date       │
                │ userId(FK) │
                │ createdAt  │
                │ updatedAt  │
                └────────────┘
```

### Modelo: users

```typescript
model User {
  id        String     @id @default(uuid())
  email     String     @unique
  password  String     // Hasheada con bcrypt
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt

  // Relaciones
  categories Category[]
  expenses   Expense[]
  incomes    Income[]

  @@map("users")
}
```

| Campo       | Tipo     | Constraints  | Descripción                   |
| ----------- | -------- | ------------ | ----------------------------- |
| `id`        | UUID     | PK, Default  | Identificador único (UUID)    |
| `email`     | String   | UNIQUE       | Email único por usuario       |
| `password`  | String   | -            | Contraseña hasheada           |
| `createdAt` | DateTime | Default(now) | Fecha de creación             |
| `updatedAt` | DateTime | Auto         | Fecha de última actualización |

---

### Modelo: categories

```typescript
model Category {
  id          String     @id @default(uuid())
  name        String
  description String?
  userId      String
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  // Relaciones
  user        User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  expenses    Expense[]

  @@map("categories")
}
```

| Campo         | Tipo     | Constraints | Descripción            |
| ------------- | -------- | ----------- | ---------------------- |
| `id`          | UUID     | PK          | Identificador único    |
| `name`        | String   | -           | Nombre de la categoría |
| `description` | String   | Nullable    | Descripción opcional   |
| `userId`      | UUID     | FK          | Referencia al usuario  |
| `createdAt`   | DateTime | Default     | Fecha de creación      |
| `updatedAt`   | DateTime | Auto        | Fecha de actualización |

---

### Modelo: expenses

```typescript
model Expense {
  id          String     @id @default(uuid())
  amount      Decimal    @db.Decimal(10, 2)
  description String
  date        DateTime
  imageUrl    String?
  userId      String
  categoryId  String?
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  // Relaciones
  user        User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  category    Category?  @relation(fields: [categoryId], references: [id], onDelete: SetNull)

  @@map("expenses")
}
```

| Campo         | Tipo          | Constraints  | Descripción                       |
| ------------- | ------------- | ------------ | --------------------------------- |
| `id`          | UUID          | PK           | Identificador único               |
| `amount`      | Decimal(10,2) | -            | Monto del gasto (hasta 99,999.99) |
| `description` | String        | -            | Descripción del gasto             |
| `date`        | DateTime      | -            | Fecha del gasto                   |
| `imageUrl`    | String        | Nullable     | URL de imagen (Cloudinary)        |
| `userId`      | UUID          | FK           | Referencia al usuario             |
| `categoryId`  | UUID          | FK, Nullable | Categoría del gasto               |
| `createdAt`   | DateTime      | Default      | Fecha de creación                 |
| `updatedAt`   | DateTime      | Auto         | Fecha de actualización            |

**Relaciones:**

- `onDelete: Cascade` - Si se elimina usuario, se eliminan todos los gastos
- `onDelete: SetNull` - Si se elimina categoría, categoryId se pone NULL

---

### Modelo: incomes

```typescript
model Income {
  id          String   @id @default(uuid())
  amount      Decimal  @db.Decimal(10, 2)
  description String
  date        DateTime
  userId      String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("incomes")
}
```

| Campo         | Tipo          | Constraints | Descripción             |
| ------------- | ------------- | ----------- | ----------------------- |
| `id`          | UUID          | PK          | Identificador único     |
| `amount`      | Decimal(10,2) | -           | Monto del ingreso       |
| `description` | String        | -           | Descripción del ingreso |
| `date`        | DateTime      | -           | Fecha del ingreso       |
| `userId`      | UUID          | FK          | Referencia al usuario   |
| `createdAt`   | DateTime      | Default     | Fecha de creación       |
| `updatedAt`   | DateTime      | Auto        | Fecha de actualización  |

---

## 🔒 Seguridad

### Medidas de Seguridad Implementadas

#### ✅ Backend

- **JWT con expiración** - Tokens que expiran automáticamente
- **Contraseñas hasheadas** - Almacenamiento seguro con bcrypt (10 rounds)
- **Validación de DTOs** - Decoradores de validación (`class-validator`)
- **Guards de autenticación** - Protección de endpoints
- **Aislamiento de datos** - Cada usuario solo accede a sus datos
- **CORS configurado** - Controlado acceso cross-origin
- **Validación de entrada** - Sanitización y validación de datos
- **Control de errores** - Sin exposición de información sensible

#### ✅ Frontend

- **Token en localStorage** - Almacenamiento seguro en cliente
- **Interceptores axios** - Inyección automática de token
- **Auto-logout** - Limpieza automática en error 401
- **Validación local** - Validación antes de enviar
- **Manejo de errores** - Mensajes seguros

### Mejores Prácticas de Seguridad

```typescript
// ✅ SEGURO - Validación completa
@Post()
@UseGuards(JwtGuard)
create(
  @CurrentUser() user: { userId: string },
  @Body() dto: CreateExpenseDto  // Validado con DTOs
) {
  return this.expensesService.create(user.userId, dto);
}

// ❌ INSEGURO - Sin validación
@Post()
create(@Body() data: any) {
  // Acepta cualquier dato sin validar
}
```

```typescript
// ✅ SEGURO - Filtrado por usuario
async findAll(userId: string) {
  return this.prisma.expense.findMany({
    where: { userId }  // ← Solo datos del usuario autenticado
  });
}

// ❌ INSEGURO - Sin filtrado
async findAll() {
  return this.prisma.expense.findMany();  // ← Todos los gastos
}
```

---

## 🚀 Deployment

### Deploy en Producción

#### **Opción 1: Render (Recomendado)**

**Backend:**

1. Push a GitHub
2. Conectar repositorio en https://render.com
3. Crear nuevo Web Service
4. Configurar variables de entorno
5. Deploy automático

**Frontend:**

1. Conectar repositorio en Vercel
2. Seleccionar directorio `font`
3. Configurar `NEXT_PUBLIC_API_URL`
4. Deploy automático

#### **Opción 2: Railway**

```bash
# Instalar CLI de Railway
npm install -g railway

# Login
railway login

# Inicializar proyecto
railway init

# Linkear a proyecto existente
railway link

# Deploy
railway up
```

#### **Opción 3: Docker (Avanzado)**

**Dockerfile - Backend:**

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY back/package*.json ./
RUN npm ci --only=production

COPY back/. .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
```

**Dockerfile - Frontend:**

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

COPY font/package*.json ./
RUN npm ci

COPY font/. .

RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

EXPOSE 3001

CMD ["npm", "run", "start"]
```

### Checklist Pre-Deployment

- [ ] Variables de entorno configuradas
- [ ] Base de datos PostgreSQL en producción
- [ ] JWT_SECRET seguro y único
- [ ] CORS origins actualizados
- [ ] Tests pasando
- [ ] Build sin errores
- [ ] Migraciones ejecutadas
- [ ] Backups configurados
- [ ] Monitoring activo
- [ ] SSL/TLS habilitado

---

## 🔮 Mejoras Futuras

### Corto Plazo (1-2 semanas)

- [ ] **Autenticación OAuth2** (Google, GitHub)
- [ ] **Recuperación de contraseña** vía email
- [ ] **Verificación de email** en registro
- [ ] **Rate limiting** en endpoints
- [ ] **Búsqueda y filtrado** avanzado de transacciones
- [ ] **Exportación de datos** (CSV, PDF)

### Mediano Plazo (1-2 meses)

- [ ] **Gráficos y reportes** (Chart.js, Recharts)
- [ ] **Presupuestos y alertas** de gastos
- [ ] **Etiquetas personalizadas** (tags)
- [ ] **Transferencias entre cuentas**
- [ ] **Historial de cambios** (auditoría)
- [ ] **Actualización de categorías** en lote

### Largo Plazo (3+ meses)

- [ ] **App móvil** (React Native o Flutter)
- [ ] **Sincronización offline** (PWA)
- [ ] **Integraciones bancarias** (plaid API)
- [ ] **Machine Learning** - Predicciones de gastos
- [ ] **Multi-moneda** y conversión automática
- [ ] **Colaboración** - Gastos compartidos
- [ ] **2FA** (Two-Factor Authentication)
- [ ] **API pública** para integraciones

---

## ⚡ Recomendaciones Técnicas Profesionales

### 🔴 Problemas Identificados

#### 1. **Error de Zona Horaria en Fechas** ✅ CORREGIDO

**Problema:** Al seleccionar una fecha en el input (YYYY-MM-DD), se guardaba como UTC, causando que aparezca el día anterior en zona horaria local.

**Solución Aplicada:**

```typescript
// Crear fecha a mediodía UTC para asegurar mismo día
date: new Date(dto.date + 'T12:00:00Z');
```

**Impacto:** ✅ Fechas consistentes en todas las zonas horarias

---

#### 2. **Type Safety con `any`** ⚠️ A MEJORAR

**Problema:** Uso excesivo de `any` en DTOs y servicios

```typescript
const data: any = {
  // ❌ Evitar
  amount: dto.amount,
};
```

**Recomendación:**

```typescript
interface ExpenseData {
  amount: number;
  description: string;
  date: Date;
  userId: string;
  categoryId?: string;
  imageUrl?: string;
}

const data: ExpenseData = {
  // ✅ Mejor
  amount: dto.amount,
};
```

---

#### 3. **Validación de Pertenencia de Recursos** ✅ IMPLEMENTADO

**Estado:** Bien implementado con `findOne()` antes de actualizar/eliminar

```typescript
async update(id: string, userId: string, dto: UpdateExpenseDto) {
  await this.findOne(id, userId);  // ✅ Valida acceso
  // ...
}
```

---

#### 4. **Error Handling Inconsistente** ⚠️ A MEJORAR

**Recomendación:** Usar filter de excepciones global

```typescript
// main.ts
app.useGlobalFilters(new AllExceptionsFilter());
```

---

#### 5. **Falta de Logging** ⚠️ A IMPLEMENTAR

**Recomendación:** Agregar logger para debugging

```bash
npm install @nestjs/logger
```

---

### 🟡 Mejoras de Rendimiento

#### 1. **Pagination en Endpoints**

```typescript
@Get()
findAll(
  @CurrentUser() user: { userId: string },
  @Query('skip') skip: number = 0,
  @Query('take') take: number = 10
) {
  return this.expensesService.findAll(user.userId, skip, take);
}
```

#### 2. **Caching con Redis**

```bash
npm install redis @nestjs/cache-manager
```

#### 3. **Índices en Base de Datos**

```sql
CREATE INDEX idx_expenses_userId_date ON expenses(userId, date);
CREATE INDEX idx_incomes_userId_date ON incomes(userId, date);
```

---

### 🟢 Buenas Prácticas Detectadas

✅ **Modularidad** - Código bien organizado en módulos  
✅ **DTOs** - Validación con decoradores  
✅ **Guards** - Protección de endpoints  
✅ **Relaciones Prisma** - Cascade y SetNull correctos  
✅ **CORS** - Configurado apropiadamente  
✅ **Swagger** - Documentación automática  
✅ **TypeScript** - Tipado fuerte  
✅ **Separación de responsabilidades** - Controllers → Services → ORM

---

## 🤝 Contribución

Para contribuir al proyecto:

1. **Fork** el repositorio
2. **Crea** una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abre** un Pull Request

---

## 📄 Licencia

Este proyecto es **UNLICENSED** - Todos los derechos reservados.

---

## 👨‍💻 Tecnologías Utilizadas

### Backend

| Tecnología          | Versión | Propósito                |
| ------------------- | ------- | ------------------------ |
| **NestJS**          | 11.0.1  | Framework web progresivo |
| **Prisma**          | 6.19.3  | ORM Type-safe            |
| **PostgreSQL**      | 16      | Base de datos            |
| **JWT**             | 11.0.2  | Autenticación            |
| **Passport**        | 0.7.0   | Autenticación            |
| **bcryptjs**        | 3.0.3   | Hash de contraseñas      |
| **Swagger**         | 11.4.3  | Documentación API        |
| **Class Validator** | 0.15.1  | Validación de DTOs       |
| **Cloudinary**      | 2.10.0  | Storage de imágenes      |

### Frontend

| Tecnología       | Versión | Propósito       |
| ---------------- | ------- | --------------- |
| **Next.js**      | 16.2.6  | Framework React |
| **React**        | 19.2.4  | Librería UI     |
| **TypeScript**   | 5.x     | Lenguaje tipado |
| **Tailwind CSS** | 4.x     | Estilos CSS     |
| **Axios**        | 1.16.1  | Cliente HTTP    |

---

## 📞 Soporte

Para reportar bugs o sugerencias:

- 📧 Email: [tu-email@ejemplo.com]
- 🐛 Issues: [GitHub Issues]
- 💬 Discussions: [GitHub Discussions]

---

**Hecho con ❤️ para gestionar tus finanzas de forma inteligente**

---

<div align="center">

### ⭐ Si este proyecto te fue útil, considera darle una estrella! ⭐

</div>
