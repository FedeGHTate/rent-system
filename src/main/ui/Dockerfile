FROM node:20

ARG NEXT_PUBLIC_BACKEND_INTERNAL_URL
ENV NEXT_PUBLIC_BACKEND_INTERNAL_URL=${NEXT_PUBLIC_BACKEND_INTERNAL_URL}

WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]
