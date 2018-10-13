#Vagrant::DEFAULT_SERVER_URL.replace('https://vagrantcloud.com')
Vagrant.configure("2") do |config|

  # Set the box to use
  config.vm.box = "ubuntu/trusty64"

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.

  if Vagrant::Util::Platform.windows?
    # For some reason normal networking settings break windows
    config.vm.network :forwarded_port, guest: 80, host: 8087
    config.vm.network :forwarded_port, guest: 443, host: 8447
    config.vm.network :forwarded_port, guest: 3306, host: 3311
  else
    config.vm.network :private_network, ip: "192.168.33.16"
  end

  # Set the hostname
  config.vm.hostname = "gh7.lessannoyingcrm.com"

  ## Enable provisioning with a shell script. Additional provisioners such as
  # Puppet, Chef, Ansible, Salt, and Docker are also available. Please see the
  # documentation for more information about their specific syntax and use.
  config.vm.provision "shell", privileged: false, inline: <<-SHELL
    echo "Provisioning Virtual Machine..."
    sudo apt-get update
    echo "Installing developer packages..."
    sudo apt-get install build-essential curl vim -y > /dev/null
    echo "Installing Git..."
    sudo apt-get install git -y > /dev/null
    sudo add-apt-repository ppa:ondrej/php
    sudo apt-get update
    sudo apt-get install -y emacs git mysql-client nginx php7.0-fpm php7.0-mysql php7.0-mbstring php7.0-mcrypt php7.0-curl php7.0-zip php7.0-bcmath s3cmd awscli ssl-cert
    echo "Installing Node and NVM..."
    curl -o- https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
    source ~/.nvm/nvm.sh
    nvm install node
    nvm alias default node
  SHELL
end
