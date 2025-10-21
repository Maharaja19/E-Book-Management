# Use Node.js 18 LTS as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install Expo CLI globally
RUN npm install -g expo-cli

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application code
COPY . .

# Expose ports
EXPOSE 19000 19001 19002

# Start the application
CMD ["expo", "start", "--web"]