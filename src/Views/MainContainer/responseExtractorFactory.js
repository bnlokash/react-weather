export default function responseExtractorFactory(responseData){
  let data = responseData;

  return {
    LocationHeading: function() {
      let locationHeading = "";
      if (data.gCloud){
        let address_components = responseData.gCloud.results[0].address_components;
        locationHeading = "in " + address_components[0].long_name;
      } else if (data.geonames) {
        let name = data.geonames;
        if (name.includes('Lake')) {
          locationHeading = "on " + name;
        } else {
          locationHeading = "on the " + name;
        }
      } else {
        locationHeading = "in the middle of nowhere..."
      }
      return locationHeading;
    },

    LocationSubtitle: function() {
      let locationSubtitle = '';
      if (data.gCloud) {
        let address_components = responseData.gCloud.results[0].address_components;
        let prevAddressComponent = address_components[0].long_name;
        let addedToSubCounter = 0;
        // start at the second address component
        if (address_components.length > 1) {  
          for (let i = 1; i < address_components.length; i++) {
            // test if the address component includes the previous component
            if (!address_components[i].long_name.includes(prevAddressComponent)){
              // test if the last address component contains any numbers
              if (!(i === address_components.length-1 && /[0-9]/.test(address_components[i].long_name))){
                // if this is the first string to be added to locationNameSub, don't include a leading comma and space
                locationSubtitle += ((addedToSubCounter === 0 ? '' : ', ') + (address_components[i].long_name));
                addedToSubCounter++;
              }
            }
            prevAddressComponent = address_components[i].long_name;
          }
        }
      }
      return locationSubtitle;
    },

    UnitsObj: function() {
      let units = {};
      switch (data.flags.units) {
        case 'ca' :
          units.temperatureUnit = 'C';
          units.windSpeedUnit = 'km/h';
          units.visibilityUnit = 'km';
          break;
        case 'uk2' :
          units.temperatureUnit = 'C';
          units.windSpeedUnit = 'mph';
          units.visibilityUnit = 'mi';
          break;
        case 'us' :
          units.temperatureUnit = 'F';
          units.windSpeedUnit = 'mph';
          units.visibilityUnit = 'mi';
          break;
        default :
          // si
          units.temperatureUnit = 'C';
          units.windSpeedUnit = 'm/s';
          units.visibilityUnit = 'km';
      }
      return units;
    },

    CurrentlyObj: function() {
      const {currently, hourly, daily} = data;
      let newCurrently = currently;
      newCurrently.dailyDescription = hourly.summary;
      newCurrently.weeklyDescription = daily.summary;
      newCurrently.precipType = hourly.data[0].precipType ? hourly.data[0].precipType : 'Precipitation';
      newCurrently.apparentHigh = daily.data[0].apparentTemperatureHigh;
      newCurrently.apparentLow = daily.data[0].apparentTemperatureLow;
      return newCurrently;
    },

    HourlyArr: function() {
      let newHourly = [];
      newHourly.push(responseData.hourly.data[0]); 
      newHourly.push(responseData.hourly.data[2]); 
      newHourly.push(responseData.hourly.data[4]); 
      newHourly.push(responseData.hourly.data[6]); 
      newHourly.push(responseData.hourly.data[8]);
      return newHourly;
    },

    DailyObj: function() {
      let newDaily = {};
      newDaily.days = responseData.daily.data.slice(0, 5);
      newDaily.summary = responseData.daily.summary;
      newDaily.icon = responseData.daily.icon;
      return newDaily;
    }
  };
}