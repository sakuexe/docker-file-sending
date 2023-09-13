# Assignment 1 - Docker

9.2023 - HAMK Riihimäki - Cloudservices Course

### Building the images

```bash
docker build -t sakuexe/client-image ./client
docker build -t sakuexe/server-image ./server
```

### Running and stopping the containers with docker-compose (recommended)

this way will use the default values for the environment variables.
Unless you change the values in the docker-compose.yml file or Dockerfiles.

```bash
# running
docker-compose up -d
# stopping
docker-compose down
```

### Running the containers with docker run

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
