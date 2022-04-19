#!/bin/bash

sudo chmod -R 777 /home/ubuntu/server

cd "/home/ubuntu/server/React.js + Node.js/backend"

#add npm and node to path
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)

# install node modules
npm install

# start our node backend
npm run setup:prod
sudo NODE_ENV=production pm2 -f start src/index.js
pm2 startup
pm2 save