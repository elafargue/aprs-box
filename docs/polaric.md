# Polaric server

Polaric is a really cool combination of APRS daemon that connects to Direwolf, and a Web application that provides a complete mapping solution on the Beaglebone.

One of the really interesting aspects of Polaric, is its ability to serve cached maps from the providers that support that option, making the box really autonomous if required.

## Quick install

Polaric can be a bit complicated to compile from scratch, so I am providing a set of binary packages that will get you going in just a few minutes:

- [polaric-aprsd](https://github.com/elafargue/aprs-box/blob/master/packages/polaric-aprsd_1.8.1_all.deb)
- [polaric-webapp](https://github.com/elafargue/aprs-box/blob/master/packages/polaric-webapp_1.8_all.deb)
- [polaric-webconfig](https://github.com/elafargue/aprs-box/blob/master/packages/polaric-webconfig-plugin_1.8.0_all.deb)

You will get a lot of unresolved dependencies, and you need to run

```
sudo apt-get -f install
```

in order to automatically download and solve all those dependencies.

### Configuration

Once Polaric server is installed, you need to configure it

- [/etc/polaric-aprsd/](https://github.com/elafargue/aprs-box/tree/master/config/etc/polaric-aprsd)
- [/etc/polaric/webapp/](https://github.com/elafargue/aprs-box/tree/master/config/etc/polaric-webapp)
- [/var/lib/polaric/config.xml](https://github.com/elafargue/aprs-box/blob/master/config/var/lib/polaric/config.xml)

Contain all the setup files. Be careful about the following:

- Use your own callsign in [/etc/polaric-aprsd/server.ini](https://github.com/elafargue/aprs-box/blob/master/config/etc/polaric-aprsd/server.ini) and [/var/lib/polaric/config.xml](https://github.com/elafargue/aprs-box/blob/master/config/var/lib/polaric/config.xml).

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

Modify the aprsd Makefile to use byaccj instead of yacc.

In webapp, modify compile-js.sh to add alias ccompile=closure-compiler at the beginning of the file.

You can then build the Debian packages for aprsd, webapp and webconfig-plugin (in that order) by launching

```
fakeroot ./debian/rules binary
```

in each project directory (aprsd, webapp, webconfig-plugin).
