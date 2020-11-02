#FROM node:13.3.0 AS compile-image
FROM 10.2.206.8:8001/angular/node:13.3.0 AS compile-image 

WORKDIR /opt/ng
COPY package.json package-lock.json ./

#Workaround from https://www.jhipster.tech/configuring-a-corporate-proxy/
RUN npm config set proxy http://nico:N1c0l45@172.16.254.40:8080
RUN npm config set https-proxy http://nico:N1c0l45@172.16.254.40:8080

#Workaround from https://stackoverflow.com/questions/45433130/npm-install-gets-stuck-at-fetchmetadata
#RUN npm cache verify

#RUN npm install --verbose
RUN npm install

ENV PATH="./node_modules/.bin:$PATH" 

COPY . ./
RUN ng build

#FROM nginx
FROM 10.2.206.8:8001/angular/nginx:latest

COPY --from=compile-image /opt/ng/dist/web-guardias /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf