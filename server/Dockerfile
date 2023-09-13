FROM node:slim

ENV SAVEPATH /serverdata
ENV SERVER="/download"
# Additional environment variables can be added here.
# ENV PORT=3000
# ENV CHARACTERS=3000 # number of characters inside the file

WORKDIR /usr/src/app

VOLUME servervol

COPY package*.json ./

RUN npm install

# Create directory for downloaded files
# container may crash if directory does not exist
RUN mkdir -p ${SAVEPATH}

COPY . .

CMD [ "node", "index.js" ]

EXPOSE 3000
