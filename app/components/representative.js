import React from 'react';
import {
  Alert,
  Button,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import GenericHouse from '../images/house.png';
import GenericSenate from '../images/senate.png';

const UNKNOWN_NAME = '';

export default class Representative extends React.Component {
  static displayName = 'Representative';

  /**
   * Call the this representative at their first listed number.
   */
  doCall = () => {
    /**
     * Helper function to get the rep's phone number.
     */
    function getPhoneNumber (person) {
      return new Promise((resolve, reject) => {
        try {
          const phone = person.phones[0];
          resolve(phone);
        }
        catch (err) {
          reject();
        }
      });
    }

    /*
     * Start of doCall logic.
     */
    let phoneNumber, url;
    getPhoneNumber(this.props.person)
    .then((phone) => {
      phoneNumber = phone;
      url = `tel:${phoneNumber}`;
      return Linking.canOpenURL(url);
    })
    .then((isSupported) => {
      if (!isSupported) {
        return Promise.reject();
      }

      // Trigger the phone application.
      return Linking.openURL(url);
    })
    .catch((err) => {
      const name = this.props.person.name;
      const postfix = (phoneNumber) ?
        ` You can dial manually at\n${phoneNumber}` :
        ' There is no phone number listed';
      const msg = `We were unable to call ${name} for you.\n${postfix}.`;
      Alert.alert('Blame Canada', msg);
    });
  }

  /**
   * Trigger a refresh of the representative data.
   */
  tryAgain = () => {
    this.props.doRefresh();
  }

  /**
   * Transition to more info screen.
   */
  showDetails = () => {
    this.props.changeScene(this.props.person);
  }

  renderCallButton = () => {
    return (
      <Button style={styles.call}
              title='Call'
              color='#0157ae'
              onPress={this.doCall}>
      </Button>
    );
  }

  renderRefreshButton = () => {
    return (
      <Button style={styles.call}
              title='Reload'
              color='#0157ae'
              onPress={this.tryAgain}>
      </Button>
    ); 
  }

  render () {
    let name, photoUrl, bgImage, button, onPress;
  
    let obj = this.props.person;
    if (Object.keys(obj).length === 1) {
      name = UNKNOWN_NAME;
      button = this.renderRefreshButton();
      onPress = null;
    }
    else {
      name = this.props.person.name;
      photoUrl = this.props.person.photoUrl;
      button = this.renderCallButton();
      onPress = this.showDetails;
    }
    bgImage = (this.props.person.chamber === 'house') ? GenericHouse : GenericSenate;

    return (
      <View style={styles.component}>
        <View style={styles.container}>
          <TouchableHighlight onPress={onPress}>
            <Image style={styles.squareImage} source={bgImage}>
              <Image style={styles.image} source={{uri: photoUrl}} />
            </Image>
          </TouchableHighlight>
          <TouchableHighlight onPress={onPress}>
            <Text style={styles.name}
                  ellipsizeMode='tail'
                  numberOfLines={2}>
              {name}
            </Text>
          </TouchableHighlight>
          { button }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    width: 140,
    height: 200,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 15,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 15,
  },
  squareImage: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  image: {
    width: 100,
    height: 115,
    borderRadius: 15,
  },
  name: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  call: {
  }
});
