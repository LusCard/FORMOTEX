## 📁 Estructura del Proyecto

```
src/
├── controllers/          # Controladores HTTP (manejo de requests/responses)
│   └── user.controller.ts
├── services/            # Lógica de negocio
│   └── user.service.ts
├── interfaces/          # Definiciones de tipos y contratos
│   ├── user.interface.ts
│   └── user-service.interface.ts
├── models/             # Modelos de base de datos
│   └── User.ts
├── routes/             # Definición de rutas
│   └── user.routes.ts
├── utils/              # Utilidades
│   └── error-handler.ts
├── app.ts              # Configuración de Express
└── server.ts           # Punto de entrada de la aplicación
```

### Pasos de instalación

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/Tobias-Vega/backend-node-solid.git
   cd backend-node-solid
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno**

   Crear un archivo `.env` en la raíz del proyecto:

   ```env
   PORT=
   MONGO_URL=
   ```

4. **Ejecutar en modo desarrollo**

   ```bash
   npm run dev
   ```

   El servidor se iniciará en `http://localhost:3000`
