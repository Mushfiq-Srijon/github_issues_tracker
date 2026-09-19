FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    nginx \
    default-mysql-client \
    libzip-dev \
    unzip \
    git \
    curl \
    && docker-php-ext-install pdo_mysql bcmath

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . .

RUN composer install --no-dev --optimize-autoloader

RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

COPY nginx.conf /etc/nginx/sites-available/default

COPY start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 10000

CMD ["/start.sh"]