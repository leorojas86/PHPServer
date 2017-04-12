#!/bin/bash
clear && clear && clear && clear
MY_PATH=`dirname "$0"`
MY_NAME=`basename "$0"`

echo "

Script location: $MY_PATH"
cd "$MY_PATH"
pwd

echo "

-> Seeing all Docker containers:"
docker ps --all
echo "

-> Running container..."
docker run \
--rm \
--interactive \
--tty \
--detach \
--name=phpservercontainer \
--publish 80:80 phpserver \
bash

#--ip 192.168.0.180 \
#--network=isolated_nw \

docker start phpservercontainer
echo "

-> Seeing all Docker containers:"
docker ps --all
