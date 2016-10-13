import React from "react";
import ReactDOM from 'react-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

const defaultID = 1;
const defaultData = [{ID:defaultID, timestamp:0, lat:52.008778, lon:-0.771088, ele:170}];

class Livemap extends React.Component {
  constructor() {
    super();
  }

  render() {
      var self = this;
      
      let centerPosition = _.find(this.props.data, function(el){return el.ID==self.props.clickBusID});

      if (centerPosition===undefined)
        centerPosition = this.props.data[0];

      const busIcon = L.icon({ iconUrl: 'images/bus.png', iconSize: [32, 32], });
      const listMarker = _.map(this.props.data, function (d, i) {
          let popupText = _.find(self.props.busData, function(el) { return el.ID == d.ID; });
          return <Marker key={i}
              position={[d.lat, d.lon]}
              clickable='true'
              icon={busIcon}
              title={popupText.Title}
              draggable='false'
              >
              <Popup>
                  <span>{popupText.Title}</span>
              </Popup>
          </Marker>
      });

      return (
          <Map center={[centerPosition.lat, centerPosition.lon]} zoom={18}>
              <TileLayer
                  url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  />
              {listMarker}
          </Map>
      );
  }
}

Livemap.propTypes = {
	clickBusID: React.PropTypes.number.isRequired,
    busData: React.PropTypes.array.isRequired,
  	data: React.PropTypes.array.isRequired
};

Livemap.defaultProps = {
    clickBusID:defaultID,
	data:defaultData
}

export default Livemap;
