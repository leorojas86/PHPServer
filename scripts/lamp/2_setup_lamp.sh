#!/bin/bash
clear && clear && clear && clear
MY_PATH=`dirname "$0"`
MY_NAME=`basename "$0"`
echo "

Script location: $MY_PATH"
cd "$MY_PATH"
pwd

echo "

-> Running MySQL Scripts to setup database..."
mysql --user="root" --password="root123" < "../services/users/users.sql"
mysql --user="root" --password="root123" < "../services/tags/tags.sql"
mysql --user="root" --password="root123" < "../services/groups/groups.sql"

echo "

-> Updating virtual hosts..."
sudo cp -rf "000-default.conf" "/etc/apache2/sites-available/000-default.conf"
PWD=`pwd`
sudo chmod -R 755 "$PWD"
REPO_PATH=$(echo ${PWD} | sed 's#/scripts/lamp##g')
sudo sed -i "s#{{REPO_PATH}}#$REPO_PATH#g" "/etc/apache2/sites-available/000-default.conf"

echo "

-> Updating hosts file..."

if grep -q "inventory" "/etc/hosts"; then
  echo "hosts file is already updated, nothing to do"
else
  sudo echo "

  127.0.0.1	inventory
  " >> /etc/hosts
fi

echo "

-> Restarting Apache..."
sudo service apache2 restart

echo "

-> Setting up uploads folder..."
#http://www.macinstruct.com/node/415
sudo mkdir ../../uploads
sudo chmod 777 ../../uploads
