#!/bin/bash
clear && clear && clear && clear
MY_PATH=`dirname "$0"`
MY_NAME=`basename "$0"`
echo "

Script location: $MY_PATH"
cd "$MY_PATH"
pwd
SERVICES_PATH="$MY_PATH/../../api/services"

echo "

-> Running MySQL Scripts to setup database..."
mysql --user="root" --password="root123" < "$SERVICES_PATH/users/users.sql"
mysql --user="root" --password="root123" < "$SERVICES_PATH/tags/tags.sql"
mysql --user="root" --password="root123" < "$SERVICES_PATH/groups/groups.sql"

echo "

-> Updating virtual hosts..."
cp -rf "000-default.conf" "/etc/apache2/sites-available/000-default.conf"
PWD=`pwd`
chmod -R 755 "$PWD"
REPO_PATH=$(echo ${PWD} | sed 's#/scripts/lamp##g')
sed -i "s#{{REPO_PATH}}#$REPO_PATH#g" "/etc/apache2/sites-available/000-default.conf"

echo "

-> Updating hosts file..."

if grep -q "inventory" "/etc/hosts"; then
  echo "hosts file is already updated, nothing to do"
else
  echo "

  127.0.0.1	inventory
  " >> /etc/hosts
fi

echo "

-> Updating apache2.conf..."

if grep -q "ServerName" "/etc/apache2/apache2.conf"; then
  echo "apache2.conf already has ServerName, nothing to do"
else
  echo "

  ServerName	inventory
  " >> /etc/apache2/apache2.conf
fi

echo "

-> Restarting Apache..."
service apache2 restart

echo "

-> Setting up uploads folder..."
#http://www.macinstruct.com/node/415
mkdir ../../uploads
chmod 777 ../../uploads
