import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import styles from './styles';

const HomeScreen = ({ navigation }) => (
  <View style={styles.global.mainContainer}>
    <Text>Home Screen</Text>
    <Button
      onPress={() => navigation.navigate('Details')}
      title="Go to details"
    />
  </View>
);

const DetailsScreen = () => (
  <View style={styles.global.content}>
    <Text>
      Meggings single-origin coffee crucifix meh chicharrones plaid lumbersexual. Pop-up pinterest sriracha chicharrones tumblr pickled ramps meggings. DIY austin lomo post-ironic. Vinyl kogi godard, messenger bag tattooed post-ironic cronut. Kickstarter knausgaard beard raclette fanny pack. Yr authentic master cleanse banjo lo-fi etsy, health goth tote bag art party copper mug tattooed vinyl fingerstache keytar. 
    </Text>
  </View>  
);

const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTitle: 'Movie Browser List',
      headerTitleStyle: { textAlign: 'center' }
    },
  },
  Details: {
    screen: DetailsScreen,
    navigationOptions: {
      headerTitle: 'Details',
    },
  },
});

export default RootNavigator;
