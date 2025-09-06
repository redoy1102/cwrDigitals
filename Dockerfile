# Stage 1: Build frontend assets with Node
FROM node:20-bullseye AS node-builder
WORKDIR /app

# copy package files first to leverage cache
COPY package*.json ./
# if you use pnpm or yarn also copy lockfile accordingly
RUN npm ci --silent

# copy all sources and build
COPY . .
RUN npm run build

# Stage 2: PHP runtime + Composer
FROM php:8.3-cli

# install system deps and PHP extensions required by Laravel
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpng-dev \
    libjpeg-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    curl \
    && docker-php-ext-configure gd --with-jpeg \
    && docker-php-ext-install -j$(nproc) pdo_mysql mbstring exif pcntl bcmath gd zip

# install composer
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# copy app source
COPY . .

# copy built frontend from node-builder
COPY --from=node-builder /app/public /var/www/html/public

# install php dependencies (production)
ENV COMPOSER_ALLOW_SUPERUSER=1
RUN composer install --no-dev --optimize-autoloader --no-interaction

# set permissions for storage and cache
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache || true \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache || true

# expose port expected by Railway / Laravel
EXPOSE 10000

# run migrations manually via console; start server
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=10000"]
