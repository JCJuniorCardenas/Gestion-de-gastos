# 💰 Registro Financiero

Aplicación full-stack de gestión financiera personal que permite registrar y rastrear gastos e ingresos de forma segura y organizada.

## 📌 Descripción

**Registro Financiero** es una solución moderna para gestionar tus finanzas personales. Registra tus gastos e ingresos, categorizalos y visualiza tu balance financiero en tiempo real.

## 🚀 Demo en Vivo

- 🖥️ **Frontend:** [gestion-de-gastos-ten.vercel.app](https://gestion-de-gastos-ten.vercel.app)
- 🔌 **API + Swagger Docs:** [gestion-de-gastos-gvho.onrender.com/api](https://gestion-de-gastos-gvho.onrender.com/api)

> ⚠️ El backend está en el free tier de Render: si nadie lo usó en los últimos 15 min, la primera petición puede tardar ~30-50 segundos en responder (cold start). Dale un momento a la primera carga.


### Características Principales

- 📊 Registro completo de gastos e ingresos
- 💼 Gestión de categorías personalizadas
- 🔐 Autenticación segura con JWT
- 🖼️ Soporte para imágenes en gastos
- 📱 Interfaz responsiva y moderna
- ⚡ API REST documentada con Swagger

---

## 🛠️ Tecnologías

### Backend

- **NestJS** v11.0 - Framework progresivo
- **TypeScript** - Tipado fuerte
- **Prisma** v6.19 - ORM type-safe
- **PostgreSQL** - Base de datos relacional
- **JWT** - Autenticación
- **Passport** - Estrategia JWT
- **bcryptjs** - Hash de contraseñas

### Frontend

- **Next.js** v16.2 - React framework
- **React** v19.2 - UI library
- **TypeScript** - Tipado fuerte
- **Tailwind CSS** v4 - Estilos
- **Axios** - Cliente HTTP

---

## 🚀 Quick Start

### Requisitos Previos

- Node.js 18+
- npm 9+
- PostgreSQL 14+

### Instalación

```bash
# Clonar repositorio
git clone <repository-url>
cd "Registro financiero"

# Backend
cd back
npm install

# Frontend
cd ../font
npm install
```

### Configuración

**Backend (.env en `back/`):**

```env
DATABASE_URL="postgresql://user:password@localhost:5432/expense_tracker"
JWT_SECRET="tu-secret-seguro"
JWT_EXPIRATION="24h"
NODE_ENV="development"
PORT=3000
```

**Frontend (.env.local en `font/`):**

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Iniciar

```bash
# Terminal 1 - Backend
cd back
npm run start:dev

# Terminal 2 - Frontend
cd font
npm run dev
```

**Accede a:**

- 🖥️ Frontend: http://localhost:3001
- 🔌 Backend: http://localhost:3000
- 📚 API Docs: http://localhost:3000/api

---

## 🔌 Endpoints API

### Autenticación

#### Registrar

```http
POST /auth/register
Content-Type: application/json

{
  "email": "usuario@ejemplo.com",
  "password": "MiContraseña123"
}
```

#### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "usuario@ejemplo.com",
  "password": "MiContraseña123"
}
```

---

### Gastos (Expenses)

#### Crear Gasto

```http
POST /expenses
Authorization: Bearer {token}
Content-Type: application/json

{
  "amount": 45.50,
  "description": "Compra en supermercado",
  "date": "2025-05-19",
  "categoryId": "cat-uuid-optional"
}
```

#### Obtener Todos

```http
GET /expenses
Authorization: Bearer {token}
```

#### Obtener por ID

```http
GET /expenses/:id
Authorization: Bearer {token}
```

#### Actualizar

```http
PATCH /expenses/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "amount": 50.00,
  "description": "Actualizado"
}
```

#### Eliminar

```http
DELETE /expenses/:id
Authorization: Bearer {token}
```

---

### Ingresos (Incomes)

#### Crear Ingreso

```http
POST /incomes
Authorization: Bearer {token}
Content-Type: application/json

{
  "amount": 1500.00,
  "description": "Salario",
  "date": "2025-05-01"
}
```

#### Obtener Todos

```http
GET /incomes
Authorization: Bearer {token}
```

#### Obtener por ID

```http
GET /incomes/:id
Authorization: Bearer {token}
```

#### Actualizar

```http
PATCH /incomes/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "amount": 1600.00
}
```

#### Eliminar

```http
DELETE /incomes/:id
Authorization: Bearer {token}
```

---

### Categorías (Categories)

#### Crear Categoría

```http
POST /categories
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Alimentación",
  "description": "Gastos en comida"
}
```

#### Obtener Todas

```http
GET /categories
Authorization: Bearer {token}
```

#### Obtener por ID

```http
GET /categories/:id
Authorization: Bearer {token}
```

#### Actualizar

```http
PATCH /categories/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Comida y Bebidas"
}
```

#### Eliminar

```http
DELETE /categories/:id
Authorization: Bearer {token}
```

---

## 🔐 Seguridad

- ✅ Autenticación JWT con expiración
- ✅ Contraseñas hasheadas con bcrypt (10 rounds)
- ✅ Aislamiento de datos por usuario
- ✅ Validación de DTOs en todas las entradas
- ✅ CORS configurado
- ✅ Protección en endpoints con JwtGuard

---

## 📚 Documentación

Accede a la documentación interactiva en: **http://localhost:3000/api**

Para probar endpoints protegidos:

1. Llama a `/auth/login` o `/auth/register`
2. Copia el `access_token` de la respuesta
3. Presiona "Authorize" en Swagger
4. Pega el token en formato: `Bearer {token}`

---

## 📝 Scripts de Backend

```bash
# Desarrollo
npm run start:dev

# Producción
npm run start:prod

# Testing
npm test

# Build
npm run build
```

---

## ✅ Testing

```bash
cd back
npm test  # 39 tests pasando
```

---

## 📄 Licencia

UNLICENSED - Todos los derechos reservados
