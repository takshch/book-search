#!/bin/bash

sudo yum install -y gcc-c++ make
curl -sL https://rpm.nodesource.com/setup_14.x | sudo -E bash -

sudo yum install -y nodejs
sudo yum install -y nvm

sudo npm install pm2@latest -y
