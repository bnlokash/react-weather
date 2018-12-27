const express = require('express');
const axios = require('axios');
const cors = require('cors');
const apicache = require('apicache');

const APIKeys = require('./APIKeys');

const cache = apicache.middleware;
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(cache('5 minutes'));

app.get('/weather/:lat,:long', (req, res)=>{
  let lat = req.params.lat;
  let long = req.params.long;
  axios.get(`https://api.darksky.net/forecast/${APIKeys.darkSky()}/${lat},${long}?units=auto`)
  .then((darkSkyResponse)=>{
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&result_type=neighborhood|sublocality|locality|administrative_area_level_3|administrative_area_level_2|administrative_area_level_1&key=${APIKeys.gCloud()}`)
    .then((gCloudResponse)=>{
      if (gCloudResponse.data.status !== "OK") {
        axios.get(`http://api.geonames.org/oceanJSON?lat=${lat}&lng=${long}&username=bnlokash`)
        .then((geonamesResponse)=> {
          console.log(geonamesResponse);
          let data = darkSkyResponse.data;
          data.geonames = geonamesResponse.data.ocean.name;
          res.send(data);
        })
        .catch((geonamesErr)=>{
          console.log(geonamesErr);
          res.send(geonamesErr);
        })
      } else {
        let data = darkSkyResponse.data;
        data.gCloud = gCloudResponse.data;
        res.send(data);
      }
    })
    .catch((gCloudError)=>{
      console.log(gCloudError);
      res.send(gCloudError);
    });
  })
  .catch((darkSkyError)=>{
    console.log(darkSkyError);
    res.send(darkSkyError);
  })
});

app.get('/initMap', (req, res)=>{
  axios.get(`https://maps.googleapis.com/maps/api/js?key=${APIKeys.gCloud()}`)
  .then((response)=>{
    res.send(response.data);
  })
  .catch((error)=>{
    res.send(error);
  });
});

app.get('/placeAutocomplete/:text', (req, res)=>{
  axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${req.params.text}&types=(regions)&key=${APIKeys.gCloud()}`)
  .then((response)=>{
    res.send(response.data);
  })
  .catch((err)=>{
    console.log(err);
    res.send(err);
  })
});

app.get('/geocode/:placeID', (req, res)=>{
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?place_id=${req.params.placeID}&key=${APIKeys.gCloud()}`)
  .then((response)=>{
    res.send(response.data);
  })
  .catch((err)=>{
    console.log(err);
    res.send(err);
  })
})

app.listen(port, ()=>{
  console.log(`listening on ${port}`);
});
