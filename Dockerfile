FROM node:18.17.0

RUN mkdir /code

WORKDIR /code

COPY .  /code

RUN npm install

CMD ["npm", "run", "dev"]

EXPOSE 9528