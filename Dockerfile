FROM node:21.3.0-alpine3.18 as base

FROM base as build
WORKDIR /app
ADD . /app
RUN npm install && npm run build && npm run start::webpack

FROM base as relise
WORKDIR /app
COPY --from=build /app/dist/bundle.js /app/

CMD ["node", "/app/bundle.js"]
