#!/bin/bash

php artisan optimize:clear &&
    php artisan config:cache &&
    composer install --no-dev --prefer-dist &&
    chown -R www-data:www-data /var/www/intranet-tourism/storage
    chown -R www-data:www-data /var/www/intranet-tourism/bootstrap/cache
    chmod -R 775 /var/www/intranet-tourism/storage 
    chmod -R 775 /var/www/intranet-tourism/bootstrap/cache
    php artisan storage:link &&
    npm install &&
    npm run build &&
    sudo systemctl restart nginx &&
    sudo systemctl restart artisan-queue &&
    sudo systemctl restart artisan-reverb
