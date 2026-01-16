# ---------- builder ----------
    FROM node:18-alpine AS builder
    WORKDIR /app
    
    COPY package*.json ./
    RUN npm install
    
    COPY . .
    RUN npm run build
    
    # views/public ni dist ga ko‘chir (uploads/productsImg ni compose volume orqali beramiz)
    RUN mkdir -p dist/views dist/public && \
        cp -r src/views/*  dist/views/  || true && \
        cp -r src/public/* dist/public/ || true
    
    # ---------- runtime ----------
    FROM node:18-alpine AS runtime
    WORKDIR /app
    
    COPY package*.json ./
    RUN npm install --production
    
    # build natijasi
    COPY --from=builder /app/dist ./dist
    
    # uploads / productsImg papkalarini konteynerda mavjud qilib qo'yamiz
    RUN mkdir -p /app/uploads /app/productsImg
    
    EXPOSE 3003
    CMD ["node", "dist/server.js"]
    