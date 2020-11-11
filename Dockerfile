FROM node:lts

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
#RUN yarn tsc --build tsconfig.json

ENTRYPOINT [ "yarn", "run" ]