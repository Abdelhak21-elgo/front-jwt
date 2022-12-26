### STAGE 1 : BUILD ###
FROM node:16.17-alpine AS Build
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install
COPY . /app
RUN npm run build:prod -- --outputPath=./dist/out

### STAGE 2 : RUN ### 
FROM nginx:1.17-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=Build /usr/src/app/dist/out /usr/share/nginx/html