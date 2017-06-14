FROM node:8-alpine

LABEL maintainer "Antoine Aumjaud <antoine_dev@aumjaud.fr>"

EXPOSE 9080

WORKDIR /home/app
COPY src/main .
COPY data data
COPY node_modules node_modules
RUN mkdir logs

VOLUME ./conf
VOLUME ./data
VOLUME ./logs

CMD node server.js > logs/api-family.txt
