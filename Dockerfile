# Stage 1: build frontend
FROM node:20-bullseye AS node-builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --silent
COPY . .
RUN npm run build

# Stage 2: PHP runtime (8.3) + Composer
FROM php:8.3-cli
RUN apt-get update && apt-get install -y \
    git unzip libpng-dev libjpeg-dev libonig-dev libxml2-dev libzip-dev zip curl \
    && docker-php-ext-configure gd --with-jpeg \
    && docker-php-ext-install -j$(nproc) pdo_mysql mbstring exif pcntl bcmath gd zip

COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# leverage cache: copy composer files first
COPY composer.json composer.lock ./
ENV COMPOSER_ALLOW_SUPERUSER=1
RUN composer install --no-dev --optimize-autoloader --no-interaction --no-scripts

# copy app sources
COPY . .

# copy built frontend
COPY --from=node-builder /app/public /var/www/html/public

# set permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache || true \
 && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache || true

EXPOSE 10000
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=10000"]
