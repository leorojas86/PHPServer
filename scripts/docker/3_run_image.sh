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
docker run -itd \
--network=isolated_nw \
--name=phpservercontainer \
-p 80:80 phpserver \
bash

docker start phpservercontainer
echo "

-> Seeing all Docker containers:"
docker ps --all
