#!/bin/bash

sudo chmod -R 777 /home/ubuntu/server

cd "/home/ubuntu/server/React.js + Node.js/"

#add npm and node to path
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)

# start react.js app
cd client
npm install
npm run build
sudo pm2 serve build 80 --spa
pm2 save

# start our node backend
cd ../backend
npm install
npm run setup:prod
sudo pm2 -f start ecosystem.config.js
pm2 save