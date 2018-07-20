FROM node:9.11

ENV NODE_ENV production

ADD . /usr/src
WORKDIR /usr/src
RUN npm install

ENTRYPOINT ["npm", "start"]
CMD []
