FROM node:10

WORKDIR /usr/src/backend

COPY package.json ./
COPY yarn.lock ./

RUN yarn  install

COPY . .

EXPOSE 3000

ENTRYPOINT ["./entrypoint.sh"]
