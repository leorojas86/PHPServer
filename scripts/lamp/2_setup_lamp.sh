#!/bin/bash
clear && clear && clear && clear
MY_PATH=`dirname "$0"`
MY_NAME=`basename "$0"`
echo "

Script location: $MY_PATH"
cd "$MY_PATH"
pwd
PWD=`pwd`
chmod -R 755 "$PWD"
REPO_PATH=$(echo ${PWD} | sed 's#/scripts/lamp##g')
SERVICES_PATH="$MY_PATH/../../api/services"

echo "

-> Restarting Mysql..."
service mysql restart

echo "

-> Running MySQL Scripts to setup database..."
ROOT_PASSWORD="root123"
mysql --user="root" --password="$ROOT_PASSWORD" < "$SERVICES_PATH/users/users.sql"
mysql --user="root" --password="$ROOT_PASSWORD" < "$SERVICES_PATH/tags/tags.sql"
mysql --user="root" --password="$ROOT_PASSWORD" < "$SERVICES_PATH/groups/groups.sql"

sed -i "" "s|const DB_PASS|const DB_PASS='$ROOT_PASSWORD';//|" "$REPO_PATH/api/services/users/DBConfig.php"
sed -i "" "s|const DB_PASS|const DB_PASS='$ROOT_PASSWORD';//|" "$REPO_PATH/api/services/tags/DBConfig.php"
sed -i "" "s|const DB_PASS|const DB_PASS='$ROOT_PASSWORD';//|" "$REPO_PATH/api/services/groups/DBConfig.php"

echo "

-> Updating virtual hosts..."
cp -rf "000-default.conf" "/etc/apache2/sites-available/000-default.conf"
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
