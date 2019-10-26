FROM node:10.16.3

WORKDIR /home/node/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

ENV HTTP_RESPONSE_TESTER_RESPONSES '{}'

COPY . .

USER node
CMD ["node", "./js/http-response-tester.js"]
