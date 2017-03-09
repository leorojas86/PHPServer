#!/bin/bash
# https://www.atlantic.net/community/howto/install-linux-apache-mysql-php-lamp-stack-on-ubuntu-16-04/
echo '


-> Updating apt-get...'
sudo bash -c 'yes | sudo apt update'
sudo bash -c 'yes | sudo apt upgrade'
echo '


-> Installing apache...'
sudo bash -c 'yes | sudo apt install apache2'
echo '


-> Installing mysql..'
sudo dpkg --configure -a
sudo echo "mysql-server mysql-server/root_password password root123" | debconf-set-selections
sudo echo "mysql-server mysql-server/root_password_again password root123" | debconf-set-selections
sudo bash -c 'yes | apt -y install mysql-server php7.0-mysql'
echo '


-> Installing php...'
sudo apt install php libapache2-mod-php
