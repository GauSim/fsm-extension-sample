FROM node:10 AS builder

ARG APP_VERSION
ENV APP_VERSION=${APP_VERSION}

RUN mkdir -p /app
RUN mkdir -p /app/backend
RUN mkdir -p /app/frontend


######### BUILD BACKEND ##########
WORKDIR /app/backend
COPY ./application/backend .
RUN npm rebuild
RUN npm install
RUN npm run build

######### BUILD FRONTEND #########
WORKDIR /app/frontend
COPY ./application/frontend .
RUN npm install
RUN npm run build

######### MERGE ##################
WORKDIR /app
RUN cp -r ./frontend/dist/frontend ./backend/dist/static
RUN ls -a -l ./backend/dist/*
RUN ls -a -l ./backend/dist/static/*

######### RUNNER CONTAINER WITH MINIMAL DEPS ############
FROM mhart/alpine-node:10

WORKDIR /app/
COPY --from=builder /app/backend/dist .
COPY --from=builder /app/backend/package*.json ./
RUN npm install --only=production
CMD [ "node", "main.js" ]