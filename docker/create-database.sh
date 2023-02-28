#!/bin/bash

# Wait for the MySQL service to be up and running
until mysqladmin ping -h db --silent; do
  echo 'Waiting for MySQL service to be up...'
  sleep 1
done

# Create the 'test' database
echo 'Creating test database...'
mysql -h db -uroot -proot -e 'CREATE DATABASE IF NOT EXISTS test;'
echo 'Test database created.'
