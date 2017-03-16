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
