FROM node:slim
EXPOSE 3001
WORKDIR /home/node
COPY package.json .
RUN npm install
COPY . .