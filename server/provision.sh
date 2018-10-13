#!/usr/bin/env bash

echo "Provisioning Virtual Machine..."
sudo apt-get update
echo "Installing developer packages..."
sudo apt-get install build-essential curl vim -y > /dev/null
echo "Installing Git..."
sudo apt-get install git -y > /dev/null
sudo add-apt-repository ppa:ondrej/php
sudo apt-get update
sudo apt-get install -y emacs git mysql-client nginx php7.0-fpm php7.0-mysql php7.0-mbstring php7.0-mcrypt php7.0-curl php7.0-zip php7.0-bcmath s3cmd awscli ssl-cert
#echo "Installing Node and NVM..."
#curl -o- https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
#source ~/.nvm/nvm.sh
#nvm install node
#nvm alias default node

sudo openssl dhparam -dsaparam -out /etc/ssl/certs/dhparam.pem 4096
sudo cp /vagrant/server/api.globalhacrm.com /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/api.globalhacrm.com /etc/nginx/sites-enabled/api.globalhacrm.com
sudo service nginx restart