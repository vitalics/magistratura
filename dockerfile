FROM node:10.15.2-alpine

WORKDIR /app
COPY package.json yarn.lock ./

RUN yarn install

COPY . .

ENTRYPOINT [ "yarn" , "start" ]

EXPOSE 3000