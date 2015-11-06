# Software installation

This guide takes you across two tracks:

- Detailed description of the software setup
- Quick start guide to let you configure the box in (almost) 'fire and forget' mode

The software installation covers the following elements:

- TNC (radio modem)
- Mapping server
- Monitoring facility
- System configuration for long term autonomous runnning

## Quick start guide

### Operating system installation

You will need a decent sizer uSD card – 32GB is perfect if you intend to store a lot of offline maps.

Use Debian Jessie 8 (http://elinux.org/BeagleBoardDebian#BeagleBone.2FBeagleBone_Black), and downgrade kernel to 3.8 series to enable the use of the audio cape – the current edge kernel is in flux when it comes to BBB capes support.

```
apt-get install l linux-image-3.8.13-bone73
```

After reboot, you should disable the built-in default HDMI cape which takes over the BBB audio channels: edit ```/boot/uEnv.txt``` and add the cape_disable and cape_enable lines below the ```uname_r``` key:

```
uname_r=3.8.13-bone73

cape_disable=capemgr.disable_partno=BB-BONELT-HDMI
cape_enable=capemgr.enable_partno=BB-BONE-AUDI-02
```

The disable of HDMI is required because the Audio Cape uses the BBB's built-in audio chip which is normally used by HDMI, so it won't run if HDMI is enabled.

You should then reboot, and  launch ```alsamixer``` to check everything is loading.

### Sound card configuration

The radio audio output is connected to the BBB using the BLUE jack.

In alsamixer, you will need to mute all "Right PGA Mixer XXX" and "Left PGA Mixer XXX" EXCEPT "Right PGA Mixer Mic3L" and "Left PGA Mixer Mic3L". Be very careful to enable Mic3L in BOTH cases, other if you use a fancy radio like the Elecraft KX3, the “stereo” effect of the radio messes everything up!


## Software components

Before installing any of the additional software components below, make sure you have all the fundamentals for compilation installed on your Beaglebone:

```
sudo apt-get install cmake build-essential libusb-1.0-0-dev libasound2-dev
```

### Direwolf

[Direwolf](direwolf.md) is our sound card modem.

### Polaric server

[Polaric](polaric.md) is used to map APRS stations on a web site.

### Monitoring

We are using log.io to provide a simple read-only interface to monitor how the box is doing. In day to day use, this has proved very valuable to check that the box is running smoothly.

