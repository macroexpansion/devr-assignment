# Devr

## Prerequisite
- Node.js v16.16.0
- [pnpm](https://pnpm.io/installation) v8.8.0
- Docker Engine v24.0.6
- Docker Desktop v4.25.2

## Installation
Install Node.js dependencies
```bash
pnpm i
```

## Overview
The app has 3 parts:
- [Scripts](./src/script): scripts to load and update data to Redis Stream
- [Back-end](./src/be): simple HTTP server that can
    - read data from Redis stream then send to front-end
    - notify the front-end when new data has been updated in the Redis stream
- [Front-end](./src/fe): request data from back-end and render Treemap

## Usage
- First, start the Redis instance using `docker-compose`
```bash
# Open a new terminal
docker compose up -d
```

- Read and load data to Redis Stream
```bash
pnpm load-data
```

- Start back-end and front-end
```bash
# Open a new terminal
pnpm dev:be
pnpm dev:fe
```
- Then, open `http://localhost:8080` in browser, we can see the Treemap is being rendered

- Finally, we can update data in Redis Stream and the Treemap will be rendered in real-time. The parameters to update data is defined in [./src/script/update.js](./src/script/update.js), we can change it there
- For example, by default the command will update population of state **Kansas** in **1990** to **10 000 000**
```bash
# Open a new terminal
pnpm update-data
```
- After this command, we can see the **Kansas** state rectangle is growing bigger in browser.

## Note
- To reset data, just run stop the Redis container and start it again
```bash
docker compose down
# then
docker compose up -d
```
