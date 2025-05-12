# Dockerfile.dev
FROM node:20-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia solo los archivos de dependencias primero
COPY package.json yarn.lock ./

# Instala las dependencias dentro del contenedor
RUN yarn install

# Copia el resto del código fuente
COPY . .

# Expone el puerto por defecto de Vite
EXPOSE 5173

# Comando por defecto
CMD ["yarn", "dev", "--host"]
