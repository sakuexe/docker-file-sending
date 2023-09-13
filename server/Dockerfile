FROM node

ENV SAVEPATH /serverdata
# Additional environment variables can be added here.
# ENV PORT=3000
# ENV PORT=3000

VOLUME /serverdata

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

VOLUME /serverdata

CMD [ "node", "index.js" ]

EXPOSE 3000
