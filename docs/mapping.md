# Mapping

One of the strengths of Polaric-webapp is that it can leverage mapcache to create a local cache of maps on the server - a Beaglebone in our case. This means that even without an Internet connection, you will still be able to run the Web app with actual maps.

## Online maps

When you have an Internet connection, there is no reason not to use OpenstreetMaps or Google maps. The map configuration in [/etc/polaric-webapp/mapconfig.js](https://github.com/elafargue/aprs-box/blob/master/config/etc/polaric-webapp/mapconfig.js) defines OpenstreetMaps, and multiple Google Maps layers by default.

Google Maps, in particular, does not allow you to cache its contents, so you will always need to be online to use those maps.

## Online/offline maps

Polaric-webapp (the OpenLayer subsystem of Webapp, really) is configured to leverage "mapcache". Mapcache requires a source that can talk the WMS protocol, and is able to locally proxy and cache the contents of maps, making them available offline - indefinitely if the expiry date of the cache is set to zero.

For North America, there are several map providers that work great with Mapcache, and are pre-configured in ```mapconfig.js``` : the USGS topo and satellite maps.

The OpenStreetMaps wiki [mentions WMS](http://wiki.openstreetmap.org/wiki/WMS) but I had very limited success with any of the providers mentioned there.

## Overall performance

On a Beaglebone black, map serving and caching, while not great, is perfectly adequate for a couple of users.