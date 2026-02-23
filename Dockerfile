FROM oven/bun:1.2.22-alpine

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .

EXPOSE 3000

# CMD ["bun", "run", "start"]
