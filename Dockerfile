# Definir la imagen base para la etapa de desarrollo
FROM node:18.16.1-alpine3.17 as dev-deps
# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app
# Copiar el archivo package.json al directorio de trabajo
COPY package.json package.json
# Ejecutar el comando npm install para instalar las dependencias
RUN npm install --frozen-lockfile



# Definir la imagen base para la etapa de construcción
FROM node:18.16.1-alpine3.17 as builder
# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app
# Copiar los módulos de node_modules desde la etapa de desarrollo al directorio actual
COPY --from=dev-deps /app/node_modules ./node_modules
# Copiar todos los archivos al directorio de trabajo actual
COPY . .
# Construir la aplicación utilizando el comando npm build
RUN npm run build



# Definir la imagen base para la etapa de producción
FROM nginx:1.25.1 as prod
# Exponer el puerto 80 para que el contenedor de nginx pueda recibir solicitudes
EXPOSE 80
# Copiar los archivos generados en la etapa de construcción al directorio de contenido de nginx
COPY --from=builder /app/dist /usr/share/nginx/html
# Copiar los archivos estático(imágenes de los superheroes) de assets al directorio de contenido de nginx
COPY src/img/ /usr/share/nginx/html/assets
# Eliminar el archivo de configuración predeterminado de nginx
RUN rm /etc/nginx/conf.d/default.conf
# Copiar el archivo de configuración personalizado de nginx al directorio de configuración de nginx
COPY nginx/nginx.conf /etc/nginx/conf.d
# Iniciar el servidor nginx en primer plano cuando se ejecute el contenedor
CMD [ "nginx","-g", "daemon off;" ]
