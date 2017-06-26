import React from 'react';
import {
  Alert,
  StyleSheet,
  View
} from 'react-native';

import packageJSON from '../package.json';

// APIs.
import CivicAPI from './api/googleCivic.js';
import Geolocation from './api/geolocation.js';
import ReverseGeo from './api/googleGeolocation.js';

// Analytics.
import Flurry from 'react-native-flurry-analytics';

// Screens.
import * as Screens from './screens/index.js';

/*
 * Members.
 */
const FLURRY_API_KEY = '<API_KEY>';

const Routes = {
  Main: { id: 'Main', screenType: Screens.Reps },
  Info: { id: 'Info', screenType: Screens.RepInfo }
};

export default class Controller extends React.Component {
  state = {
    route: Routes.Main,
    isLoading: true,
    senator1: { chamber: 'senate' },
    senator2: { chamber: 'senate'},
    representative: { chamber: 'house' },
    person: {}
  };

  /*
   * Member Functions.
   */

  /**
   * Get the user's geolocation.
   * Reverse Geocode the location to get the address.
   * Look up representatives by address.
   */ 
  refreshData = () => {
    this.setState({
      isLoading: true
    });

    Geolocation.getLocation()
    .then(ReverseGeo.getAddressByGeolocation)
    .then((address) => {
      return Promise.all([
        CivicAPI.getRepresentative(address),
        CivicAPI.getSenators(address)
      ])
    })
    .then((representatives) => {
      const senators = Object.assign(representatives[1].officials, { chamber: 'senate'});
      const house = Object.assign(representatives[0].officials[0], { chamber: 'house' });

      this.setState({
        isLoading: false,
        senator1: senators[0],
        senator2: senators[1],
        representative: house
      });
    })
    .catch((error) => {
      this.setState({
        isLoading: false
      });

      // Send an analytics event.
      Flurry.logEvent('Failed to retrieve data.', { error: error });
    });
  }

  showMain = () => {
    this.setState({ route: Routes.Main });
  }

  showRepInfo = (repInfo) => {
    this.setState({
      route: Routes.Info,
      person: repInfo
    });
  }

  /*
   * React Lifecycle Functions.
   */
  // componentDidMount () {
  //   // Flurry setup.
  //   Flurry.setAppVersion(packageJSON.version);
  //   Flurry.setCrashReportingEnabled(true);
  //   Flurry.setEventLoggingEnabled(true);
  //   Flurry.startSession(FLURRY_API_KEY);

  //   // The first time the component mounts, go get data.
  //   this.refreshData();
  // }

  render () {
    const {
      route,
      isLoading,
      senator1,
      senator2,
      representative,
      person
    } = this.state;

    let screen;
    if (route.id === 'Main') {
      screen = React.createElement(
        route.screenType,
        {
          isLoading: isLoading,
          senator1: senator1,
          senator2: senator2,
          representative: representative,
          refreshData: this.refreshData,
          changeScene: this.showRepInfo
        }
      );
    }
    else {
      // We're going to the RepInfo screen.
      screen = React.createElement(
        route.screenType,
        {
          person: person,
          changeScene: this.showMain
        }
      );
    }

    return (
      <View style={styles.container}>
        { screen }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})
