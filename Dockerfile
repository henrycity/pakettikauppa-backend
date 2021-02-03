# --[Builder stage]--
FROM node:14 AS builder

WORKDIR /app

# Install dependencies
COPY *.lock .
COPY package*.json .
RUN yarn install

# Copy config files
COPY tsconfig.json .

# Copy source code
COPY ./src ./src

# Build the source
RUN yarn build

# --[Production stage]--
FROM node:14

WORKDIR /app

# Install dependencies
COPY *.lock .
COPY package*.json .
RUN yarn install --prod

# Create SSL cert
RUN openssl req -newkey rsa:4096 -x509 -sha256 -days 3650 -nodes -out backend.crt -keyout backend.key -subj "/C=/ST=/L=/O=/OU=/CN="

# Copy built project files from builder
COPY --from=builder /app/build ./build

# Run the backend
ENTRYPOINT [ "yarn", "run", "start-no-build" ]