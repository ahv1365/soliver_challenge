# Stage 1: Build the React app
FROM node:14 as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the project files to the container
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the built React app using Nginx
FROM nginx:alpine

# Copy the built app from the previous stage to the nginx server
COPY --from=build /app/build /usr/share/nginx/html

# Expose the container's port, where the React app will run
EXPOSE 80

# Start the nginx server
CMD ["nginx", "-g", "daemon off;"]
