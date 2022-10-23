FROM node:14.18-alpine as builder

ENV NODE_ENV build

WORKDIR /home/node

COPY . /home/node

RUN apk add --update python3 make g++\
  && rm -rf /var/cache/apk/*

RUN npm ci \
  && npm run build \
  && npm prune --production

FROM node:14.18-alpine 

ENV NODE_ENV production

USER node
WORKDIR /home/node

COPY --from=builder /home/node/package*.json /home/node/
COPY --from=builder /home/node/node_modules/ /home/node/node_modules/
COPY --from=builder /home/node/dist/ /home/node/dist/

EXPOSE 4000

CMD ["node", "dist/main.js"]