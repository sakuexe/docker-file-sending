# **Assignment 1 - Docker**

9.2023 - HAMK Riihimäki - Cloudservices Course

### Running and stopping the containers with docker-compose (recommended)

this way will use the default values for the environment variables.
Unless you change the values in the docker-compose.yml file or Dockerfiles.

```bash
# running and building
docker-compose up
# only building the images
docker-compose build
# stopping
docker-compose down
# remove all volumes
docker volume rm $(docker volume ls -q --filter dangling=true)
```

Settings for the applications can be changed from the settings.env file.

### Running the containers with scripts

```bash
# to run the server
./runserver.sh
# to run the client
./runclient.sh
# run with custom parameters, available parameters below
./runserver.sh --debug --port 4321 --mount "$(pwd)/serverdata"
# to stop the containers
docker stop server
```

**Available parameters:**

- --port, -p: the port the server will listen to (default: 3000)

- --mount, -m: the path where the server will save the files (default: /serverdata)

- --network, -n: the amount of characters that the sent file will include (default: teht1network)

- --execute, -e: run the container with the given parameters (skips build and setup)

- --debug, -d: run the container in debug mode (will run the container with -it flag)

### Running the containers with docker run

1. Building the images

```bash
docker build -t sakuexe/client-image ./client
docker build -t sakuexe/server-image ./server
```

2. Create a network for the containers to communicate with each other

```bash
docker network create teht1network
```

3. Create a volume for the server to save the files to

```bash
# to create a volume with the default destination
docker volume create servervol
docker volume create clientvol
# to create a volume with the destination of your choice
docker volume create -o type=none -o device=[path] -o o=bind servervol
docker volume create -o type=none -o device=[path] -o o=bind clientvol
```

4. Run the containers

```bash
# to use the default PORT of 3000
docker run -d --rm --name server --network teht1network sakuexe/server-image
docker run -d --rm --name client --network teht1network sakuexe/client-image
# to use the port of your choice (use the same port for both)
docker run -d --rm --name server --network teht1network -e PORT=[port] sakuexe/server-image
docker run -d --rm --name client --network teht1network -e PORT=[port] sakuexe/client-image
```

**Available environment variables:**

for both:

- PORT: the port the server will listen to (default: 3000)
- SERVER: the path of the server where file is to be sent (default: /download)

for the server:

- SAVEPATH: the path where the server will save the files (default: /serverdata)
- CHARACTERS: the amount of characters that the sent file will include (default: 1000)

for the client:

- DIR: the directory where the client will save the files (default: /clientdata)
- FILENAME: the name of the file that the client will save (default: downloadedfile.txt)
- URL: the url of the server (default: http://server:3000/download)

### Stopping the containers

```bash
docker stop server
docker stop client
```
