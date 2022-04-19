#!/bin/bash

sudo chmod -R 777 /home/ubuntu/server

cd "/home/ubuntu/server/Ember.js + Firebase/client"

npm run build
sudo pm2 serve dist 80 --spa
pm2 save
