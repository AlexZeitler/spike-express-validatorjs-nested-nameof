FROM node:14.17.1-slim

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

# RUN yarn
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN yarn
RUN yarn build
CMD ["npx", "ts-node", "src/Server.ts"]
