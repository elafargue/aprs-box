# Polaric server

Polaric is a really cool complete mapping solution comprised of an APRS daemon 
that connects to Direwolf, a web application and offline map tile cache.  Polaric 
is offered as a set of processor-architecture-neutral debian packages or in source
code form. It is fairly easy to run anywhere that Debian will run, and it is possible 
to run it on any Linux system where you can satisfy the requirements. This _does_ mean 
that you can run this same code on your desktop or laptop in addition to any number of
small ARM based computers.

One of the really interesting aspects of Polaric is its ability to serve cached map
tiles, making the box really autonomous if required. 

## Quick install

The Polaric team provides instructions on how to install their system using their binary 
packages, as well as how configure it with their web configuration plugin. If you're 
interested in quick, this is by far the best way to go. 

- [Binary install instructions](http://aprs.no/dokuwiki/?id=install.dev)

### Configuration

Once Polaric server is installed, you need to configure it. The best way to configure it,
as noted on the Polaric team's page, is to use the web configuration plugin. You can review 
the vast majority of configurable items in these locations: 

- [/etc/polaric-aprsd/](https://github.com/elafargue/aprs-box/tree/master/config/etc/polaric-aprsd)
- [/etc/polaric-webapp/](https://github.com/elafargue/aprs-box/tree/master/config/etc/polaric-webapp)
- [/var/lib/polaric/config.xml](https://github.com/elafargue/aprs-box/blob/master/config/var/lib/polaric/config.xml)

Be careful about the following:

- Use your own callsign in [/etc/polaric-aprsd/server.ini](https://github.com/elafargue/aprs-box/blob/master/config/etc/polaric-aprsd/server.ini) 
and [/var/lib/polaric/config.xml](https://github.com/elafargue/aprs-box/blob/master/config/var/lib/polaric/config.xml). 
(A good reason to use the packages provided by the Polaric team is that you will be prompted for your callsign as 
part of the install process.)

### Log rotation and autostart

Like we did for Direwolf, you should make sure polaric's log output is properly handled. This is done through the syslog and logrotate facilities:

- [/etc/logrotate.d/polaric-aprsd](https://github.com/elafargue/aprs-box/blob/master/config/etc/logrotate.d/polaric-aprsd)

This way, all of Polaric's log output will be directed to ```/var/log/polaric/*.log``` and be automatically rotated every day.

Auto start is handled in the init scripts:

- [/etc/init.d/polaric-aprsd](https://github.com/elafargue/aprs-box/blob/master/config/etc/init.d/polaric-aprsd)
- [/etc/init.d/polaric-webapp](https://github.com/elafargue/aprs-box/blob/master/config/etc/init.d/polaric-webapp)


## Compiling Polaric yourself

You do not need to do this if you followed the steps above!

First, install the build dependencies:

```
sudo apt-get install debhelper gettext-base libgettext-commons-java  openjdk-8-jdk scala byacc-j librxtx-java jflex closure-compiler
```

Then, check out the code from github. Note that there is a separate repository for each major 
component (aprsd, webapp, and mapcache).

```
git clone https://github.com/PolaricServer/webapp.git
git clone https://github.com/PolaricServer/aprsd.git
git clone https://github.com/PolaricServer/WebConfig-plugin.git
```

Modify the aprsd Makefile to use byaccj instead of yacc.

In webapp, modify compile-js.sh to add alias ccompile=closure-compiler at the beginning of the file.

You can then build the Debian packages for aprsd, webapp and webconfig-plugin (in that order) by launching

```
fakeroot ./debian/rules binary
```

in each project directory (aprsd, webapp, webconfig-plugin).
