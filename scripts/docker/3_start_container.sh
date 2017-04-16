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

-> Running image..."
docker run \
--rm \
--interactive \
--tty \
--detach \
--name=phpservercontainer \
--publish 80:80 phpserver \
/bin/bash

echo "

-> Starting container..."
docker start phpservercontainer

echo "

-> Running container services..."
docker exec phpservercontainer service apache2 start
docker exec phpservercontainer service mysql start

echo "

-> Seeing all Docker containers:"
docker ps --all
