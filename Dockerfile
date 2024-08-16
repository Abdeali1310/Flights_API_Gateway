FROM node

WORKDIR /developer/flights_api_gateway

COPY . .

RUN npm ci

CMD [ "npm","run","dev" ]