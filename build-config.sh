#!/bin/sh

NAME=$(cat package.json | grep name | awk -F: '{ print $2 }' | sed 's/[ \",]//g')
VERSION=$(cat package.json | grep version | awk -F: '{ print $2 }' | sed 's/[ \",]//g')
BUILD_DATE=$(date +'%F %H:%M:%S')

sed -i -e "s/name\"\: .*/name\": \"$NAME\",/" src/conf-common.json
sed -i -e "s/version\"\: .*/version\": \"$VERSION\",/" src/conf-common.json
sed -i -e "s/date\"\: .*/date\": \"$BUILD_DATE\"/" src/conf-common.json
