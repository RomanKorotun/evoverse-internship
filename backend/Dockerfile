FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

# CMD ["tail", "-f", "/dev/null"]
# CMD ["npm", "start"]
CMD ["npm", "run", "dev"]