# Use official PHP image with required extensions
FROM php:8.2-cli

# Install system dependencies and PHP extensions
RUN apt-get update && \
    apt-get install -y git unzip libpng-dev libonig-dev libxml2-dev zip curl npm && \
    docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Install Composer
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy project files
COPY . .

# Install PHP dependencies
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Install Node dependencies and build assets
RUN npm install && npm run build

# Expose port 10000
EXPOSE 10000

# Start Laravel's built-in server
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=10000"]
