FROM node:14

WORKDIR /starter
ENV NODE_ENV development

COPY ./package.json /starter/package.json

RUN yarn config delete proxy

RUN yarn --silent --no-cache

#  --network-timeout 100000

COPY . /starter

EXPOSE 8081

CMD ["yarn", "start"]
#CMD ["node", "global.js"]

