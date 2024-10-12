# Build the server
FROM node:16 AS server-build

WORKDIR /usr/src/app/server

# Copy package.json and package-lock.json
COPY server/package*.json ./

# Install server dependencies
RUN npm install

# Copy server source code
COPY server/ .

# Expose the application port
EXPOSE 5000

# Build the server
CMD ["npm", "start"]

# Build the client
FROM node:16 AS client-build

WORKDIR /usr/src/app/client

# Copy package.json and package-lock.json
COPY client/package*.json ./

# Install client dependencies
RUN npm install

# Copy client source code
COPY client/ .

# Build the client for production
RUN npm run build

# Serve the client using NGINX
FROM nginx:alpine AS final

COPY --from=client-build /usr/src/app/client/build /usr/share/nginx/html

# Copy the server build files
COPY --from=server-build /usr/src/app/server /usr/src/app/server

# Expose NGINX port
EXPOSE 80

# Command to run NGINX
CMD ["nginx", "-g", "daemon off;"]
