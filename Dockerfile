# Imagen oficial de Node.js basada en Alpine para ser más ligera
FROM node:18-alpine

WORKDIR /app

# Copiamos solo package.json y package-lock.json para aprovechar cache
COPY package*.json ./

# Instalamos solo dependencias de producción (más liviano)
RUN npm install --production

# Copiamos el resto del código
COPY . .

# Exponemos el puerto que usa el backend (5000)
EXPOSE 5000

# Comando para iniciar la app
CMD ["node", "index.js"]
