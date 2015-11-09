#!/bin/sh
arecord -c 2 -r 44100 -f float_le - | aplay -
