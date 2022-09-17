From node:16.16.0

WORKDIR /usr/app

COPY package*.json ./

RUN npm run deploy:install

COPY . .

EXPOSE 4000

CMD ["npm", "run", "deploy:production"]
