FROM node:16-alpine

LABEL maintainer "Antoine Aumjaud <antoine_dev@aumjaud.fr>"

EXPOSE 9080

WORKDIR /home/app
COPY src .
COPY node_modules node_modules
COPY data data
RUN mkdir logs

VOLUME ./conf
VOLUME ./data
VOLUME ./logs

CMD node server.js > logs/api-family.txt
