FROM node:14-alpine
WORKDIR /app/challenge

COPY package.json .

RUN npm install
RUN npm install typescript -g

COPY . .

RUN npm run build

ENV NODE_ENV=production

CMD ["node", "./dist/main.js"]

EXPOSE 3000
