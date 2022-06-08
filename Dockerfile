FROM node:latest

WORKDIR /community_post

COPY package*.json ./
COPY . . 
RUN npm install


EXPOSE 3000