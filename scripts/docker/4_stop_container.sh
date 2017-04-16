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

-> Stopping container..."
docker stop phpservercontainer

echo "

-> Removing container..."
docker rm phpservercontainer

echo "

-> Seeing all Docker containers:"
docker ps --all
