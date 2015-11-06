# Hardware

The objective of this setup is to be as compact and low power as possible. I selected a BeagleBone Black, but it should be possible to use many different kinds of single board computers:

- Beaglebone black/green
- Raspberry Pi
- CubieBoard

## Computer board

As mentioned above, pretty much any embedded computer that can run a current version of Linux will be good for this. My personal preference goes to the BeagleBone, though the CubieBoard's built-in sound card certainly sounds like a very interesting choice.

## Sound card

The sound card is usually the tricky part of those embedded computers. The BeagleBone does not have one, for instance. The CubieBoard does.

For this build, I elected to use the Beaglebone Audio cape (version 2). There are many things I find irritating with this sound card, and its drivers are very rough around the edges, but all in all, it does the job if you are careful. This doc describes how to make it work properly, and I spent quite a few hours doing that...

## PTT Switch

The last hardware part is a way to key your radio transceiver. This is actually very straightforward: if you look at the documentation of Direwolf (which is audio modem we are using), you can simply use GPIO lines on your BeagleBone with a simple transistor, and you're in business.

On this setup, I am using the following GPIOs:
- Connector P9 pin 14 (GPIO 50) : DCD Led. Lights up when Direwolf detects a radio carrier
- Connector P9 pin 16 (GPIO 51): PTT key. You will probably need a PNP transistor to key your radio, depending on the model.

## Optional components

One of the Beaglebone's great features is its ability to operate on USB power, which makes it a truly portable setup. But for general use, you might want to install a small WiFi USB dongle and turn it into a WiFi access point. More on this in the configuration section.