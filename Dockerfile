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

# Copy built project files from builder
COPY --from=builder /app/build ./build

# Run the backend
ENTRYPOINT [ "yarn", "run", "start-no-build" ]