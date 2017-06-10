FROM node:8-alpine

LABEL maintainer "Antoine Aumjaud <antoine_dev@aumjaud.fr>"

EXPOSE 9080

WORKDIR /home/app
ADD src/main .

VOLUME ./conf
VOLUME ./logs

CMD node server.js > logs/api-family.txt
