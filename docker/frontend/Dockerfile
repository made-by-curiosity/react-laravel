FROM node:lts-alpine as builder

WORKDIR /app

COPY /frontend/package*.json ./
RUN npm install

ARG VITE_API_PORT
ENV VITE_API_PORT=${VITE_API_PORT}

COPY /frontend .
RUN npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]