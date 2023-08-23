FROM node:18.14.2

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG PORT=3000

ENV PORT=$PORT

EXPOSE $PORT

RUN echo "running on port ${PORT}"

CMD ["npm", "run", "start"]
