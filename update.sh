#!/bin/bash

set -e

# Ensure the correct PHP version and Composer are installed
php -v
composer -V

# Clear and cache configurations
php artisan optimize:clear
php artisan config:cache

# Install PHP dependencies with verbose output
composer install --no-dev --prefer-dist -vvv

# Verify vendor directory and autoload.php
if [ ! -f "vendor/autoload.php" ]; then
  echo "vendor/autoload.php is missing after composer install"
  exit 1
fi

# Create storage symbolic link
php artisan storage:link

# Install Node.js dependencies and build assets
npm install
npm run build

# Restart services
sudo systemctl restart nginx
sudo systemctl restart artisan-queue
sudo systemctl restart artisan-reverb
