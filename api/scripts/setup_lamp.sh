# https://www.atlantic.net/community/howto/install-linux-apache-mysql-php-lamp-stack-on-ubuntu-16-04/
echo '


-> Updating apt-get'
sudo apt update
echo '


-> Installing apache'
sudo apt install apache2
echo '


-> Installing mysql'
sudo apt install mysql-server php7.0-mysql
echo '


-> Installing php'
sudo apt install php libapache2-mod-php
