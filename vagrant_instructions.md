Download & Install VirtualBox if not already installed.
https://www.virtualbox.org/wiki/Downloads

Choose the one for Windows hosts. Complete the installation.

Download & Install Vagrant
http://downloads.vagrantup.com/tags/v1.0.5

Download & Install msysgit
http://code.google.com/p/msysgit/downloads/list?q=full+installer+official+git

Start up Git Bash, which is a linux-style commandline for Windows. I know, that's awesome.

```$ vagrant box add lucid32 http://files.vagrantup.com/lucid32.box```

Create a folder in C:\vagrant for your projects:
```
$ cd /c/vagrant
$ mkdir projects
$ cd projects
```

Now it's time to set up nodejs:
```
$ git clone https://github.com/jamescarr/nodejs-vagrant
$ cd nodejs-vagrant
$ git submodule init && git submodule update
$ rm -rf .git*
```

Clone the nodejs project:
```$ git clone git@github.com:gavinblair/game-off-2012.git```

Start up the nodejs box. Be sure to be in the directory with the VagrantFile:
```$ vagrant up```

Wait for the box to boot up. Once it's done, 


To can set up a LAMP (Linux, Apache, MySQL, PHP) box:

```$ git clone https://github.com/ymainier/vagrant-lamp.git lamp```

