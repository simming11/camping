# Use an official Node.js runtime as the base image
FROM node:14 as builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the Angular application
RUN ng build --prod

# Use NGINX as the web server for serving the Angular app
FROM nginx:alpine

# Copy the built Angular app from the previous stage to the NGINX directory
COPY --from=builder /app/dist/* /usr/share/nginx/html/

# Expose port 80 for the web server
EXPOSE 80

# Start NGINX when the container runs
CMD ["nginx", "-g", "daemon off;"]
