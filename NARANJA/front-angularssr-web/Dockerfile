#FROM node:8-alpine

FROM nginx:alpine

# copy files from artifactory
COPY dist dist/

# setting nginx and proxy-pass
COPY nginx/security-headers.conf /etc/nginx/snippets/security-headers.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Install node and npm
RUN apk add --update nodejs nodejs-npm
RUN npm install pm2 -g --silent
CMD ["sh", "-c", "nginx && pm2-runtime dist/server.js"]
