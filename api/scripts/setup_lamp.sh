#!/bin/bash
# https://www.atlantic.net/community/howto/install-linux-apache-mysql-php-lamp-stack-on-ubuntu-16-04/
BASEDIR=$(dirname $0)
echo "



Script location: ${BASEDIR}"
cd "${BASEDIR}"
pwd
echo '


-> Updating virtual hosts...'
sudo cp -rf 'virtual_hosts/api.conf' '/etc/apache2/sites-available/api.conf'
sudo cp -rf 'virtual_hosts/inventory.conf' '/etc/apache2/sites-available/inventory.conf'
