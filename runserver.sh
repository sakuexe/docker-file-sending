#!/bin/bash

# colors
RED='\033[0;31m'
GREEN='\033[0;32m'
RESET='\033[0m'

# initialize variables to default values
port=""
network=""
mount_path=""
execute=false
debug=false

# parse the command-line options
while [[ $# -gt 0 ]]; do
  key="$1"

  case $key in
    -p|--port)
      port="$2"
      shift 2  # Consume both the option and its argument
      ;;
    -n|--network)
      network="$2"
      shift 2  # Consume both the option and its argument
      ;;
    -m|--mount)
      mount_path="$2"
      shift 2  # Consume both the option and its argument
      ;;
    -x|--execute)
      execute=true
      shift 1
      ;;
    -d|--debug)
      debug=true
      shift 1
      ;;
    *)
      # Unknown option
      echo "Unknown option: $key"
      exit 1
      ;;
  esac
done

if [ "$execute" = false ]; then

  # build the image
  docker build -t sakuexe/server-image ./server

  # create the network
  if [ -n "$network" ]; then
    # if the network name is given as an argument, use it
    docker network create $network
  else
    # otherwise create the default name for the network
    docker network create teht1network
  fi

  # create a volume for the data to be stored
  if [ -n "$mount_path" ]; then
    # if a custom path for the mount is given, use it
    # custom path must be absolute, instead of relative!!!
    docker volume create -o type=none -o device=$mount_path -o o=bind servervol
    echo -e "Server data is stored in ${GREEN}$mount_path${RESET}"
  else
    # otherwise use the default mounting point for the volume
    docker volume create servervol
  fi
fi

# add the default values for the variables if they are not given
if [ -z "$port" ]; then
  port="3000"
fi
if [ -z "$network" ]; then
  network="teht1network"
fi

if $debug; then
  echo "port: $port"
  echo "network: $network"
  echo "mount_path: $mount_path"
  docker run -it --rm --name client --network $network -e PORT=$port sakuexe/client-image
  exit 0
fi

# run the container
docker run -d --rm --name server --network $network -e PORT=$port sakuexe/server-image
echo -e "Server is running on port ${GREEN}$port${RESET} and network ${GREEN}$network${RESET}"
