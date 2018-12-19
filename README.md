# https://vast-stream-45051.herokuapp.com/

### about

This humble weather app has a few cool features
* Click on the map to see the weather for that location
* Current, hourly and daily forecasts from the DarkSky API
* Automatic units and timezone conversion
* Location names from google reverse-geocoder
  * However, google's api doesn't return any results for bodies of water.
  * In that case the names come from geonames.org oceans api.
    * But every so often this causes a cors error. Curious.
* All api requests go through a node/express middle-man in order to protect api keys.
* Icons from [Adam Whitcroft](http://adamwhitcroft.com/climacons/)
* Uses [Tachyons](http://tachyons.io) CSS framework
  * main container done with floats
  * individual panels in the hourly and daily displays use flexbox
  * responsive - hourly panels flip to horizontal on breakpoint