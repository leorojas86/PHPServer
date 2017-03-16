#!/bin/bash
clear && clear && clear && clear
MY_PATH=`dirname "$0"`
MY_NAME=`basename "$0"`
echo "



Script location: $MY_PATH"
cd "$MY_PATH"
pwd
echo "


-> Updating virtual hosts..."
sudo cp -rf "virtual_hosts/api.conf" "/etc/apache2/sites-available/api.conf"
sudo cp -rf "virtual_hosts/inventory.conf" "/etc/apache2/sites-available/inventory.conf"
PWD=`pwd`
sudo chmod -R 755 "$PWD"
REPO_PATH=$(echo ${PWD} | sed 's#/api/scripts##g')
sudo sed -i "s#{{REPO_PATH}}#$REPO_PATH#g" "/etc/apache2/sites-available/api.conf"
sudo sed -i "s#{{REPO_PATH}}#$REPO_PATH#g" "/etc/apache2/sites-available/inventory.conf"

sudo a2ensite api.conf
sudo a2ensite inventory.conf

<<"COMMENT"
if grep -Fxq "api.conf" /etc/apache2/ports.conf
then
  echo "ports.conf file is already updated"
else
  sudo echo "
NameVirtualHost *:80

<IfModule mod_ssl.c>
  # SSL name based virtual hosts are not yet supported, therefore no
  /etc/apache2/sites-available/api.conf
  Listen 80
</IfModule>
<IfModule mod_ssl.c>
  # SSL name based virtual hosts are not yet supported, therefore no
  /etc/apache2/sites-available/inventory.conf
  Listen 80
</IfModule>
  " >> /etc/apache2/ports.conf
fi
COMMENT

echo "


-> Updating hosts file..."
if grep -Fxq "127.0.0.1	api" /etc/hosts
then
  echo "hosts file is already updated"
else
  sudo echo "

  127.0.0.1	api
  127.0.0.1	inventory
  " >> /etc/hosts
fi
echo "


-> Restarting Apache..."
sudo service apache2 restart
