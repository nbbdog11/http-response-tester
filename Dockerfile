FROM node:9

WORKDIR /home/node/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

ENV HTTP_RESPONSE_TESTER_RESPONSES '{}'

COPY . .

EXPOSE 3000
USER node
CMD ["node", "./js/http-response-tester.js"]