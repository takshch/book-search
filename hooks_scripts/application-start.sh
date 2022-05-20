#!/bin/bash

sudo chmod -R 777 /home/ec2-user/server

cd "/home/ec2-user/server/client"

npm install
npm rebuild node-sass

npm run build
sudo pm2 serve dist 80 --spa
sudo pm2 save
