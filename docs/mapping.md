# Mapping

One of the strengths of Polaric-webapp is that it can leverage mapcache to create a 
local cache of maps on the server. This means that even without an Internet connection, 
you will still be able to run the Web app with actual maps.

## Online maps

When you have an Internet connection, there is no reason not to use OpenstreetMaps or Google maps. The map configuration in [/etc/polaric-webapp/mapconfig.js](https://github.com/elafargue/aprs-box/blob/master/config/etc/polaric-webapp/mapconfig.js) defines OpenstreetMaps, and multiple Google Maps layers by default.

Google Maps, in particular, does not allow you to cache its contents, so you will always need to be online to use those maps.

## Online/offline maps

Polaric-webapp can be configured to leverage 
[MapCache](http://mapserver.org/mapcache), from the MapServer project. Mapcache 
requires a source that can talk the WMS protocol, and is able to locally proxy and cache 
the contents of maps, making them available offline - indefinitely if the expiry date of 
the cache is set to zero.

For North America, there are several map providers that work great with Mapcache and are 
pre-configured in ```mapconfig.js``` : the USGS topo and satellite maps. Your state may 
offer aerial imagery from the National Agricultural Imagery Program.

Regardless of which map provider you choose, the thing to remember is: when your internet
connection is severed (whether predictably, because you headed for the hills; or unpredictably,
because of some emergency) you will have access to exactly the map data you cached ahead of time.
Seeding your map cache is important! Seed your cache over the entire area you expect to 
view. Seed it at every zoom level you intend to use. Thankfully, MapCache comes with
a tool to seed the cache.


## Rolling your own maps

The OpenStreetMaps wiki [mentions WMS](http://wiki.openstreetmap.org/wiki/WMS) but 
some of the providers may not take kindly to you seeding your map cache off of their 
server. You can always [make your own](https://switch2osm.org/serving-tiles/manually-building-a-tile-server-14-04/)
tile server from which to populate your cache. 

There are many different ways to render openstreetmap data into a visual display product (map). 
[TopOSM](http://toposm.ahlzen.com/) makes pretty maps with the correct red white and blue shield 
symbol for interstates. Note how the shaded relief, contours, and even the manmade features are
all optional. You can get the code behind those maps [here](https://github.com/Ahlzen/TopOSM),
and a slightly more modern version [here](https://github.com/bnordgren/TopOSM).

Web based mapping sources are almost universally projected using something called 
"Web Mercator". This may not be what your local authorities use. If your desire is 
to integrate into local emergency response, you can produce your map tiles in the 
projection they already use. Failure to do so will likely mean that a browser or 
your little "system on a chip" computer will be asked to reproject on the fly. This is 
a recipe for slowness and frustration.

## Overall performance

On a Beaglebone black, map serving and caching, while not great, is perfectly adequate for a couple of users.
