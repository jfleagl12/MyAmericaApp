import React from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class Loading extends React.Component {
  render () {
    return (
      <View style={styles.component}>
        <ActivityIndicator 
          size="large"
          color="white" />
        <Text style={styles.text}>
          Loading...
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d42729'
  },
  text: {
    marginTop: 7,
    color: 'white'
  }
});
