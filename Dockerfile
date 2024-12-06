FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --only=production
COPY . .
RUN npm run build

# Используем легковесный образ для финальной сборки
FROM node:20-alpine AS production
WORKDIR /app
COPY --from=build /app/build ./build
COPY --from=build /app/node_modules ./node_modules

# Удаляем ненужные файлы
RUN npm prune --production

EXPOSE 3002
CMD ["npx", "serve", "-l", "3002", "-s", "build"]
