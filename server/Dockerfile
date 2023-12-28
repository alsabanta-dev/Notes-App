FROM node:20.10.0
WORKDIR /usr/code/server
COPY package.json .
RUN npm install
COPY . .
ENV SERVER_PORT 4000
EXPOSE $SERVER_PORT
RUN npm run migrate
CMD ["npm", "run", "start:prod"]
