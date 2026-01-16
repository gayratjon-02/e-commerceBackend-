# 1) Node.js image
FROM node:18-alpine

# 2) Ishchi papka
WORKDIR /app

# 3) Faqat package fayllarini ko‘chirish va o‘rnatish
COPY package*.json ./
RUN npm install --legacy-peer-deps

# 4) Kodni ko‘chirish
COPY . .

# 5) Build (React → /build)
RUN npm run build

# 6) Static serve qiluvchi server
RUN npm install -g serve

# 7) Port
EXPOSE 3000

# 8) Start
CMD ["serve", "-s", "build", "-l", "3000"]
