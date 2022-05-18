#!/bin/bash

sudo chmod -R 777 $HOME/server

cd "$HOME/server/Ember.js + Firebase/client"

npm install
npm rebuild node-sass

npm run build
pm2 serve dist 80 --spa
pm2 save
