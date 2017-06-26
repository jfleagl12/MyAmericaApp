import React from 'react';
import {
  Alert,
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Button from 'react-native-button';

import Heading from '../components/heading.js';
import InfoRow from '../components/infoRow.js';

/**
 * Transforms a complicated server object to something more readable.
 * @param  {Object} serverData - The raw server data.
 * @return {Object}            - More friendly version.
 */
function transform (serverData) {
  // Can take these directly from the server data.
  const { name, photoUrl } = serverData;

  // Have to massage these.
  let address, phone, website;

  // Address.
  try {
    let data = serverData.address[0];
    address = `${data.line1}\n${data.city}, ${data.state} ${data.zip}`;
  }
  catch (e) { address = 'N/A'; }

  // Phone.
  try { phone = serverData.phones[0]; }
  catch (e) { phone = 'N/A'; }

  // Website.
  try { website = serverData.urls[0]; }
  catch (e) { website = 'N/A'; }

  return {
    name: name,
    imageUrl: photoUrl,
    address: address,
    phone: phone,
    website: website
  };
}

export default class RepInfo extends React.Component {

  changeScene = () => {
    this.props.changeScene();
  }

  render () {
    const {
      name,
      imageUrl,
      address,
      phone,
      website
    } = transform(this.props.person);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    const data = ds.cloneWithRows([
      { key: 'Write', value: address },
      { key: 'Call', value: phone },
      { key: 'Website', value: website },
    ]);

    return (
      <View style={styles.screen}>
        <Button style={styles.button}
                containerStyle={styles.buttonContainer}
                onPress={this.changeScene}>
                &lt; Back
        </Button>
        <Heading text={name} style={styles.heading} />
        <View style={styles.content}>
          <ListView
            dataSource={data}
            initialListSize={data.length}
            renderRow={(rowData) => {
              return (
                <InfoRow title={rowData.key} value={rowData.value} />
              );
            }}
          />
        </View>
        <Heading text='Our USA' style={styles.heading} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    backgroundColor: '#d42729'
  },
  heading: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  content: {
    flex: 6,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  button: {
    fontWeight: 'normal',
    textAlign: 'left',
    color: '#0157ae'
  },
  buttonContainer: {
    backgroundColor: 'white',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
  },
});