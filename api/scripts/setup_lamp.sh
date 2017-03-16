#!/bin/bash
clear && clear && clear && clear
MY_PATH=`dirname "$0"`
MY_NAME=`basename "$0"`
echo "



Script location: $MY_PATH"
cd "$MY_PATH"
pwd
echo "

#https://pe.godaddy.com/help/configure-apache-virtual-hosts-ubuntu-17336
#https://www.digitalocean.com/community/tutorials/how-to-set-up-apache-virtual-hosts-on-ubuntu-14-04-lts
#https://support.rackspace.com/how-to/set-up-apache-virtual-hosts-on-ubuntu/
#https://tecadmin.net/create-virtual-hosts-in-apache-on-ubuntu/
#https://www.unixmen.com/setup-apache-virtual-hosts-on-ubuntu-15-10/
#https://www.vultr.com/docs/apache-virtual-hosts-on-ubuntu-14-04-lts
#https://httpd.apache.org/docs/2.4/vhosts/examples.html

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
#sudo a2dissite api.conf
#sudo a2dissite inventory.conf

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
