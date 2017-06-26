import React from 'react';
import {
  Alert,
  Linking,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

export default class InfoRow extends React.Component {
  renderPhone = () => {
    return (
      <TouchableHighlight
        onPress={() => {
          const phone = `tel:${this.props.value}`;
          Linking.canOpenURL(phone)
          .then((isSupported) => {
            if (!isSupported) {
              return Promise.reject();
            }
            return Linking.openURL(phone);
          })
          .catch((err) => {
            // purposefully do nothing.
          });
        }}>
        <Text style={styles.text}>
          { this.props.value }
        </Text>
      </TouchableHighlight>
    );
  }
  renderUrl = () => {
    return (
      <TouchableHighlight
        onPress={() => {
          Linking.openURL(this.props.value);
        }}>
        <Text style={styles.text}>
          { this.props.value }
        </Text>
      </TouchableHighlight>      
    );
  }
  renderAddress = () => {
    // Capitalize the first letter of every word.
    let result = '';

    function capitalizeFirstLetter (word) {
      try {
        let firstLetter = word.substring(0, 1);
        firstLetter = firstLetter.toUpperCase();
        return firstLetter + word.substring(1, word.length);  
      }
      catch (e) {
        return word;
      }
    }

    const start = this.props.value;
    const split = start.split('\n');
    split[0].split(' ').forEach((word) => result += capitalizeFirstLetter(word) + ' ');
    result += '\n';
    split[1].split(' ').forEach((word) => result += capitalizeFirstLetter(word) + ' ');

    return (
      <Text style={styles.text}>
        { result }
      </Text>
    );
  }

  render () {
    let content;
    switch (this.props.title) {
      case 'Write'  : content = this.renderAddress(); break;
      case 'Call'   : content = this.renderPhone(); break;
      case 'Website': content = this.renderUrl(); break;
    }

    return (
      <View style={styles.row}>
        <View style={styles.leftCell}>
          <Text style={styles.text}>
            { this.props.title }
          </Text>
        </View>
        <View style={styles.rightCell}>
          { content }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: 15,
  },
  leftCell: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderBottomWidth: 1,
    borderColor: 'white',
    paddingBottom: 5,
  },
  rightCell: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderColor: 'white',
    paddingLeft: 20,
    paddingBottom: 5,
  },
  text: {
    color: 'white',
    fontWeight: 'bold'
  },
  link: {
    color: '#0157ae'
  }
});
