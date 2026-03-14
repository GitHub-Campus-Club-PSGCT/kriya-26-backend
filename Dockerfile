FROM node:20-alpine

WORKDIR /app

# Install dependencies first (better layer caching)
COPY package*.json ./
RUN npm install --production

# Copy source code
COPY . .

# Expose application port
EXPOSE 8000

# Start server
CMD ["npm", "start"]
