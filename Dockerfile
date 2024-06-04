# Etapa 1: Construcción de la aplicación
FROM node:18-alpine AS builder

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Instalar pnpm
RUN npm install -g pnpm

# Instalar dependencias
RUN pnpm install --frozen-lockfile

# Copiar el resto del código de la aplicación
COPY . .

# Construir la aplicación
RUN pnpm build

# Etapa 2: Servir la aplicación
FROM node:18-alpine AS runner

WORKDIR /app

# Copiar los archivos construidos desde la etapa anterior
COPY --from=builder /app ./

# Instalar serve para servir la aplicación
RUN npm install -g serve

# Comando para servir la aplicación
CMD ["serve", "-s", "out"]