#!/bin/bash
clear && clear && clear && clear
MY_PATH=`dirname "$0"`
MY_NAME=`basename "$0"`

echo "

Script location: $MY_PATH"
cd "$MY_PATH"
pwd

echo "

-> Creating network:"
docker network rm isolated_nw
docker network create \
--subnet 192.168.0.0/16 \
--driver bridge \
isolated_nw
