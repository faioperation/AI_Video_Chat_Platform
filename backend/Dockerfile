# Multi-stage Build for Laravel Backend
FROM php:8.2-fpm-alpine as base

# Install system dependencies
RUN apk add --no-cache \
    curl \
    libpng-dev \
    libxml2-dev \
    zip \
    unzip \
    git \
    oniguruma-dev \
    libzip-dev

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring zip exif pcntl bcmath gd

# Copy Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Stage 2: Build dependencies
FROM base as vendor
COPY composer.json composer.lock ./
RUN composer install --no-ansi --no-dev --no-interaction --no-plugins --no-progress --no-scripts --optimize-autoloader

# Stage 3: Final Production Image
FROM base
COPY --from=vendor /var/www/vendor /var/www/vendor
COPY . /var/www

# Fix permissions for storage and cache
RUN chmod -R 775 /var/www/storage /var/www/bootstrap/cache \
    && chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

USER www-data
EXPOSE 9000
CMD ["php-fpm"]
