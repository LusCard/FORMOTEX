# ----------------------------------------------------------------------
# ETAPA 1: BUILDER (Compila el código TypeScript a JavaScript)
# ----------------------------------------------------------------------
FROM node:24-alpine3 AS builder

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de configuración
COPY package.json package-lock.json ./

# Instala TODAS las dependencias (incluyendo devDependencies para la compilación)
RUN npm install

# Copia el código fuente
COPY . .

# Compila el código TypeScript a JavaScript
RUN npm run build 
# Asume que tienes un script 'build' en tu package.json, ej: "tsc"

# ----------------------------------------------------------------------
# ETAPA 2: PRODUCCIÓN (Imagen final, solo con el código compilado)
# ----------------------------------------------------------------------
FROM node:24-alpine3 AS production

WORKDIR /usr/src/app

# Copia solo las dependencias de producción de la etapa builder
COPY package.json package-lock.json ./
RUN npm ci --omit=dev 
# Instala solo las dependencias de producción (más rápido y seguro)

# Copia el código compilado de la etapa builder
COPY --from=builder /app/dist ./dist 
# Asume que 'dist' es el directorio de salida de la compilación

# Expone el puerto en el que escucha tu servidor (ej: 3000)
EXPOSE 3000

# Define el comando para iniciar la aplicación
CMD [ "node", "dist/server.js" ] 
# Ajusta 'server.js' al nombre de tu archivo principal compilado