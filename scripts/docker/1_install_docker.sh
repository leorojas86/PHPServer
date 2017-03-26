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
bash -c "yes | apt update"
bash -c "yes | apt upgrade"

echo "

-> Installing docker..."

#https://docs.docker.com/engine/installation/linux/ubuntu/#install-using-the-repository
echo "
--- Installing packages to allow apt to use a repository over HTTPS"
bash -c "yes | apt install \
  apt-transport-https \
  ca-certificates \
  curl \
  software-properties-common"
echo "
--- Adding Docker’s official GPG key"
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
echo "
--- Verifying that the key fingerprint is 9DC8 5822 9FC7 DD38 854A E2D8 8D81 803C 0EBF CD88"
apt-key fingerprint 0EBFCD88
echo "
--- Setting up the stable repository"
add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
echo "
--- Installing docker CE"
bash -c "yes | apt install docker-ce"
echo "
---  Listing the available versions of docker-ee"
apt-cache madison docker-ce
echo "
---  Installing docker-ee version 17.03.0"
bash -c "yes | apt install docker-ce=17.03.0~ce-0~ubuntu-xenial --fix-missing"
echo "
---  Verifying that Docker CE is installed correctly by running the hello-world image"
docker run hello-world
