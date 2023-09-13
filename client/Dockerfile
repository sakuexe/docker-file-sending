FROM node:slim

ENV DIR="/clientdata"
ENV FILENAME="downloadedfile.txt"
ENV SERVER="/download"
ENV URL="http://server"
# Additional ENV variables can be added here
# ENV PORT=3000

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN mkdir -p ${DIR}

COPY . .

CMD ["node", "index.js"]

EXPOSE 3000
