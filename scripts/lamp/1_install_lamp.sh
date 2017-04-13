#!/bin/bash
clear && clear && clear && clear
MY_PATH=`dirname "$0"`
MY_NAME=`basename "$0"`

echo "

Script location: $MY_PATH"
cd "$MY_PATH"
pwd

echo "

-> Updating apt-get..."
apt update --yes
apt upgrade --yes

echo "

-> Installing apache..."
apt install apache2 --yes

echo "

-> Installing mysql..."
#dpkg --configure -a
echo "mysql-server mysql-server/root_password password root123" | debconf-set-selections
echo "mysql-server mysql-server/root_password_again password root123" | debconf-set-selections
apt install mysql-server php7.0-mysql --yes

echo "

-> Installing php..."
apt install php libapache2-mod-php --yes
