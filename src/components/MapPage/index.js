import React, {Component} from 'react';
import {render} from 'react-dom';
import MapGL, {Marker, Popup, NavigationControl} from 'react-map-gl';
import ReactMapGL from 'react-map-gl';

import {connect} from 'react-redux';

import ControlPanel from './water-colour-info.js';
import WaterPin from './WaterPin';
import WaterInfo from './WaterPin-info';

import WATER from '../../data/water.json';

const TOKEN = 'pk.eyJ1Ijoib2xpdmlhZWxtb3JyaXNvbiIsImEiOiJjamt5djFxNWgwbmpqM3FwNGV0cGdrNjQ3In0.w81xElNUbCXiagqbEMuStA';


class MapPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: -36.8838967,
        longitude: 174.7477795,
        zoom: 10,
        bearing: 0,
        pitch: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      },
      popupInfo: null
    };
  }



  _resize = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: window.innerWidth,
        height: window.innerHeight,
      }
    });
  };

  _renderWaterMarker = (city, index) => {
   return (
     <Marker key={`marker-${index}`}
       longitude={city.longitude}
       latitude={city.latitude} >
       <WaterPin rating={city.rating} size={20} onClick={() => this.setState({popupInfo: city})} />
     </Marker>
   );
 }

 _renderPopup() {
   const {popupInfo} = this.state;

   return popupInfo && (
     <Popup tipSize={5}
       anchor="top"
       longitude={popupInfo.longitude}
       latitude={popupInfo.latitude}
       onClose={() => this.setState({popupInfo: null})} >
       <WaterInfo info={popupInfo} />
     </Popup>
   );
 }

 render() {

   const {viewport} = this.state;
   return (
     <MapGL
       {...viewport}
       longitude = {WATER[0].longitude}
       latitude = {WATER[0].latitude}
       mapStyle="mapbox://styles/mapbox/basic-v9"
       onViewportChange={this._updateViewport}
       mapboxApiAccessToken={TOKEN} >

       { WATER.map(this._renderWaterMarker) }

       {this._renderPopup()}

       <ControlPanel containerComponent={this.props.containerComponent} />

     </MapGL>
   );
 }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // getData: () => dispatch(UserActions.getData())
  }
}

function mapStateToProps(state) {
  return {
    jsonMockData: state.jsonMockData
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);
