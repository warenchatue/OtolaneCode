# Use the official Node.js image as the base image
FROM node:14 as build

# Set the working directory
WORKDIR /usr/local/app

# Copy package.json and package-lock.json to the working directory
COPY ./ /usr/local/app/

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular app
RUN npm run build --prod

# Use a smaller nginx image to serve the build output
FROM nginx:alpine
COPY --from=build /usr/local/app/dist/frontend-otolane /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
