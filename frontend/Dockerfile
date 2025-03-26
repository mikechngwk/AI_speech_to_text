# Stage 1: Build the React app
FROM node:20-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (for efficient caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the React app (creates the production build in /app/build)
RUN npm run build

# Stage 2: Serve the built app using Nginx
FROM nginx:alpine

# Copy the built React files to the Nginx HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port for Nginx
EXPOSE 80

# Start Nginx in the foreground 
CMD ["nginx", "-g", "daemon off;"]
