#!/bin/bash
MY_PATH=`dirname "$0"`
MY_NAME=`basename "$0"`
echo "



Script location: $MY_PATH"
cd "$MY_PATH"
pwd
echo '


-> Updating virtual hosts...'
sudo cp -rf 'virtual_hosts/api.conf' '/etc/apache2/sites-available/api.conf'
sudo cp -rf 'virtual_hosts/inventory.conf' '/etc/apache2/sites-available/inventory.conf'
REPO_PATH=echo "$MY_PATH" | sed "s/'api/scripts'//"
echo 'REPO_PATH=$REPO_PATH'
sudo sed -i "s/{{REPO_PATH}}/$REPO_PATH/g" '/etc/apache2/sites-available/api.conf'
sudo sed -i "s/{{REPO_PATH}}/$REPO_PATH/g" '/etc/apache2/sites-available/inventory.conf'
