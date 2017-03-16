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
sudo bash -c "yes | sudo apt update"
sudo bash -c "yes | sudo apt upgrade"

echo "

-> Installing docker..."

#https://docs.docker.com/engine/installation/linux/ubuntu/#install-using-the-repository
#Install packages to allow apt to use a repository over HTTPS
sudo apt install \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common
#Add Docker’s official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
#Verify that the key fingerprint is 9DC8 5822 9FC7 DD38 854A E2D8 8D81 803C 0EBF CD88
sudo apt-key fingerprint 0EBFCD88
