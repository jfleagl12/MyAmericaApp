import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// Components.
import Representative from '../components/representative.js';
import Heading from '../components/heading.js';
import Loading from '../components/loading.js';

export default class Reps extends React.Component {
  /**
   * Trigger a new fetch of the data.
   */
  refreshData = () => {
    this.props.refreshData();
  }

  /**
   * Trigger a scene change.
   */
  changeScene = (repInfo) => {
    this.props.changeScene(repInfo);
  }

  renderSenators = () => {
    const { senator1, senator2 } = this.props;

    return (
      <View style={styles.senators}>
        <Representative
          person={senator1}
          changeScene={() => this.changeScene(senator1)}
          doRefresh={this.refreshData} />
        <Representative
          person={senator2}
          changeScene={() => this.changeScene(senator2)}
          doRefresh={this.refreshData} />
      </View>
    );
  }

  renderReps = () => {
    const { representative } = this.props;

    return (
      <View style={styles.representative}>
        <Representative
          person={representative}
          changeScene={() => this.changeScene(representative)}
          doRefresh={this.refreshData} />
      </View>
    );
  }

  renderLoading = () => {
    return (
      <Loading />
    );
  }

  render () {
    const { isLoading } = this.props;

    let senatorsContent, repsContent;
    if (!isLoading) {
      senatorsContent = this.renderSenators();
      repsContent = this.renderReps();
    }
    else {
      senatorsContent = this.renderLoading();
      repsContent = this.renderLoading();
    }

    return (
      <View style={styles.screen}>
        <View style={styles.heading}>
          <Heading text='Senate' />
        </View>
        <View style={styles.repsContainer}>
          { senatorsContent }
        </View>
        <View style={styles.heading}>
          <Heading text='House of Representatives' />
        </View>
        <View style={styles.repsContainer}>
          { repsContent }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  heading: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  repsContainer: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d42729'
  },
  senators: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  representative: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  }
});
