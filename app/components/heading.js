import React from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
// import StarImage from '../images/star.png';

export default class Heading extends React.Component {
  static displayName = 'Heading';

  render () {
    return (
      <View style={styles.component}>
        <Text style={styles.star}>
          &#9733;&#9733;&#9733;
        </Text>
        <Text style={styles.text}>
          {this.props.text}
        </Text>
        <Text style={styles.star}>
          &#9733;&#9733;&#9733;
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0157ae',
    borderColor: 'white',
    borderBottomWidth: 3,
    borderTopWidth: 3
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textShadowColor: 'black',
    textShadowOffset: {
      width: 2,
      height: 2
    },
    textShadowRadius: 1,
    marginLeft: 3,
    marginRight: 3,

    /* Needed for Android */
    textAlignVertical: 'center',
  },
  star: {
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: {
      width: 2,
      height: 2
    },
    textShadowRadius: 1,
  }
});
