/**
 * Our USA React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StatusBar,
} from 'react-native';

import Controller from './app/controller.js';

export default class MyAmerica extends Component {
  componentDidMount () {
    StatusBar.setHidden(true);
  } 

  render () {
    return (
      <Controller />
    );
  }
}

AppRegistry.registerComponent('MyAmerica', () => MyAmerica);
