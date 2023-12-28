FROM node:20.10.0
WORKDIR /usr/code/client
COPY package.json .
RUN npm install
COPY . .
ENV CLIENT_PORT 5372
EXPOSE $CLIENT_PORT
CMD ["npm", "run", "dev"]
