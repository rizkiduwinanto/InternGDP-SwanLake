FROM node:slim
EXPOSE 3000
WORKDIR /home/node
COPY . .
RUN npm i
RUN npm run build --production
RUN npm install -g serve