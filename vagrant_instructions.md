Download & Install VirtualBox if not already installed.
https://www.virtualbox.org/wiki/Downloads

Choose the one for Windows hosts. Complete the installation.

Download & Install Vagrant
http://downloads.vagrantup.com/tags/v1.0.5

Download & Install msysgit
http://code.google.com/p/msysgit/downloads/list?q=full+installer+official+git

Start up Git Bash, which is a linux-style commandline for Windows. I know, that's awesome.

`$ vagrant box add lucid32 http://files.vagrantup.com/lucid32.box`

Create a folder in C:\vagrant for your projects:
`$ cd /c/vagrant`
`$ mkdir projects`
`$ cd projects`

To can set up a LAMP (Linux, Apache, MySQL, PHP) box:

`$ git clone https://github.com/ymainier/vagrant-lamp.git lamp`

