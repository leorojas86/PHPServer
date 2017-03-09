# https://www.atlantic.net/community/howto/install-linux-apache-mysql-php-lamp-stack-on-ubuntu-16-04/
echo '


-> Updating apt-get'
sudo bash -c 'yes | sudo apt update'
sudo bash -c 'yes | sudo apt upgrade'
echo '


-> Installing apache'
sudo bash -c 'yes | sudo apt install apache2'
echo '


-> Installing mysql'
sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password password root123'
sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password root123'
sudo bash -c 'yes | apt install mysql-server php7.0-mysql'
echo '


-> Installing php'
sudo apt install php libapache2-mod-php
