FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --only=production
COPY . .
RUN npm run build

FROM node:20-alpine AS cleaner
WORKDIR /app
COPY --from=build /app/build ./build
