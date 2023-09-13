FROM node:current-alpine

ENV DIR="/clientdata"
ENV FILENAME="file.txt"
ENV URL="http://server:3000/download"
# Additional ENV variables can be added here
# ENV PORT=3000
# ENV CHARACTERS=3000 # for changing the number of characters in the file

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["node", "index.js"]

EXPOSE 3000
