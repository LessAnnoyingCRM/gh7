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

end
