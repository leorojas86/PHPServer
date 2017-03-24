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
bash -c "yes | apt update"
bash -c "yes | apt upgrade"

echo "

-> Installing apache..."
bash -c "yes | apt install apache2"

echo "

-> Installing mysql..."
#dpkg --configure -a
echo "mysql-server mysql-server/root_password password root123" | debconf-set-selections
echo "mysql-server mysql-server/root_password_again password root123" | debconf-set-selections
bash -c "yes | apt -y install mysql-server php7.0-mysql"

echo "

-> Installing php..."
bash -c "yes | apt install php libapache2-mod-php"
