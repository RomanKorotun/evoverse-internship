# base
FROM node:20-slim AS base
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . ./

# development
FROM base AS development
ENV NODE_ENV=development
CMD ["yarn", "start:dev"]

# build
FROM base AS build
RUN yarn build

# production
FROM node:20-slim AS production
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production
COPY --from=build /app/dist ./dist
ENV NODE_ENV=production
CMD ["yarn", "start:prod"]
