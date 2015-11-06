/* 
 * Configuration file for polaric-webapp. This is actually javascript code.
 * 
 * Version 1.6 supports changing UTM projection for maps. 
 * Version 1.7 support mixing maps with different projections, languages and more..
 * 
 * For projections, you may need to add the EPSG definition, e.g. if you 
 * want to use UTM zone 35: 
 *
 * Proj4js.defs["EPSG:32635"] = "+proj=utm +zone=35 +ellps=WGS84 +datum=WGS84 +units=m +no_defs";*
 *
 * If you change projection/zone you may need to update max_extent and you 
 * may need to update layers and mapcache.xml as well. 
 *
 */

/*
 * Language for user interface: Supported languages are: 
 *  'no' = Norwegian
 *   Default is English (just comment out the next line)
 * 
 * It is also possible so change the language by using the 
 * URL parameter 'lang'
 */
//LANGUAGE('no');


/*
 * Base URL of server. Leave it empty if the server
 * and the js document are at the same location. 
 */ 
var server_url = '';



/* 
 * Default system projection. Currently we assume that this 
 * is a UTM projection. It has to be known by Proj4js
 */
var utm_projection = "EPSG:900913";

/*
 * Default map extents. Resolutions and number of zoom levels.
 * Can (probably) be overridden by the individual base layers.  
 */ 
var max_extent = [-2.0037507067161843E7, -3.0240971958386254E7, 2.0037507067161843E7, 3.0240971958386205E7];
var max_resolution = 156543.0339280410;
var min_resolution = 0.29858214164761665;
var max_zoomlevels = 20; 



var default_attribution = 'Map: <a href="http://basemap.nationalmap.gov/">USGS National Map</a>, <a href="http://www.openstreetmap.org/">OpenStreetMap</a>';


/*
 * Bacground color for maps
 */
var backgroundColor = '#A1C1C9';


/*
 * List of base layers. This is a fairly straightforward OpenLayers way
 * of setting up layers. Use the LAYER function to add a set of layers. This 
 * can be used more than once. 
 * 
 * The LAYERS function takes three arguments: 
 *    - if this is a base layer (boolean)
 *    - A predicate (a function returning a boolean value). This acts as a filter. 
 *      if evaluated to true the layers are shown in layer list. The predefined TRUE 
 *      always evaluates to true.
 *    - An array of layers. See OpenLayers documentation. 
 *
 * To add GPX vector layers, put the gpx files in directory /gpx and
 * use the function add_Gpx_Layer(name, file) to add them to the list like 
 * in the example below. 
 */


/* Polygon that draws a border around Norway */
var Norge = POLYGON( [
    {lat:58.979, lng:11.557}, {lat:58.692, lng:9.725},  {lat:57.819, lng:7.408},  {lat:58.911, lng:4.911}, 
    {lat:62.343, lng:4.428},  {lat:64.567, lng:9.962},  {lat:67.99,  lng:11.675}, {lat:70.029, lng:16.842}, 
    {lat:71.528, lng:26.154}, {lat:70.39,  lng:31.944}, {lat:69.19,  lng:29.1},   {lat:70.05,  lng:27.899}, 
    {lat:68.481, lng:24.854}, {lat:68.979, lng:21.04},  {lat:68.306, lng:20.021}, {lat:68.349, lng:18.581}, 
    {lat:64.618, lng:13.877}, {lat:64.414, lng:14.363}, {lat:63.957, lng:14.014}, {lat:63.963, lng:12.853},
    {lat:61.782, lng:12.287}, {lat:61.244, lng:12.971} 
]);


/* OpenStreetMap base layer */
LAYERS (true, TRUE, [
     new OpenLayers.Layer.OSM("OpenStreetMap", null, {gray: '0.1'})
]);

/* Google Maps base layers.
   Note: requires switching the layer a couple of times to work? Don't know where
         the issue comes from, since no error is generated?
 */

// If we are offline, the "google" variable is not defined, so we omit the Google layers, no point.
if (typeof google != 'undefined') {
LAYERS (true, TRUE, [
     new OpenLayers.Layer.Google("Google Satellite", {type: google.maps.MapTypeId.SATELLITE}),
    new OpenLayers.Layer.Google("Google Terrain", {type: google.maps.MapTypeId.TERRAIN}),
     new OpenLayers.Layer.Google("Google Streets")
 ]);
}


/* Cached Topographic and imagery maps from the USGS. Detailed map for USA, and
   basemap for the rest of the world. Requires a working mapcache installation
   */
LAYERS (true, TRUE, [
     new OpenLayers.Layer.TMS(
      "USGS Topo (cache)", "/mapcache/tms",
      { layername: 'usgs_topo_cache', type: 'jpg' }
     ),
      new OpenLayers.Layer.TMS(
      "USGS Imagery (cache)", "/mapcache/tms",
      { layername: 'usgs_imagery_cache', type: 'jpg' }
     ),
//      new OpenLayers.Layer.TMS(
 //     "USGS EROS Orthoscale (cache)", "/mapcache/tms",
  //    { layername: 'usgs_eros_ortho', type: 'jpg' }
   //  )
]);

/*
LAYERS (true, TRUE, [
    new OpenLayers.Layer.WMS(
      "Ortho imagery", "http://raster.nationalmap.gov/arcgis/services/Orthoimagery/USGS_EROS_Ortho_SCALE/ImageServer/WMSServer",
      {layers: '0'})
  ]);
*/

/* Overlay layer. UTM/MGRS Grid (from Kartverket WMS) */
LAYERS (false, TRUE, [  
       new OpenLayers.Layer.WMS(
         "UTM/MGRS Grids", "http://openwms.statkart.no/skwms1/wms.rutenett",
         { layers:'UTMrutenett',transparent: true },
         { isBaseLayer: false, singleTile: true, ratio: 1, visibility: false }
       ),
       new OpenLayers.Layer.TMS(
          "USGS Shaded relief (cache)", "/mapcache/tms",
          { layername: 'usgs_shaded_relief', type: 'png', opacity: 0.5, visibility:false }
        )
 ]);






/*
 * Menu of predefined map-extents.  
 * Extents are upper left corner (1) and lower right corner (2) in decimal degrees
 * [longitude-1, latitude-1, longitude-2, latitude-2] 
 */
var defaultView = 'bayarea';
var mapViews = [
  { name: 'ca',      title:'California',  extent: [-136.1, 43.2, -105.5, 30.5]},
  { name: 'bayarea', title:'SF Bay Area', extent: [ -123.54, 38.17, -119.58, 36.9] },
  { name: 'tahoe',   title:'Lake Tahoe',  extent: [ -121, 39.5, -118.8, 38.5  ]},
  { name: 'usa',     title: 'USA',        extent: [-127.4, 49.5, -64.5, 24]}
];


/* Filter menu. The actual filters are defined by aprsd in
 * /etc/polaric-aprsd/view.profiles. The name attribute refers to a profile-name. 
 * For non-public profiles, add attribute: restricted: 'true' 
 */

var filterViews = [
   { name: 'alle',   title: 'Everything' },
   { name: 'track',  title: 'Track 1' },
   { name: 'infra',  title: 'Infrastructure'},
   { name: 'ainfra', title: 'Active infrastructure'},
   { name: 'moving', title: 'Moving objects'},
   { name: 'wx',     title: 'Weather stations'}
];

/* View to be selected by default */
var defaultFilterView = 'alle';


/* Set to true to enable SAR URL */
var sarUrl = false; 


/* Use WPS service from Statkart to get elevation data, 
 * for now, you have to set up a proxy for this on the server
 * with the same domain name as your service. It is VERY important 
 * to remove all Authorization headers from proxied requests, to 
 * avoid leaking authentication info. 
 */

var statkartWPS_enable = false;
var statkartWPS_url = "/aprs/wps";


var statkartName_enable = false; 
var statkartName_url = "/namesearch";



/* Use service from met.no go get weather forecasts.
 * For now, you have to set up a proxy for this on the server
 * with the same domain name as your service. It is VERY important 
 * to remove all Authorization headers from proxied requests, to 
 * avoid leaking authentication info. 
 * 
 * To activate this, you should know what you are doing!
 */

var WXreport_enable = false;
var WXreport_url = "/aprs/wxdata";
