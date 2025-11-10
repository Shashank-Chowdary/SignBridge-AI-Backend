FROM node:18

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Store your API key securely in Cloud
# This is just for the Dockerfile
ENV GOOGLE_API_KEY=your-gemini-api-key

EXPOSE 5000
CMD ["node", "server.js"]
