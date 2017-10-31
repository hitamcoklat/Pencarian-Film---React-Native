import React, { Component } from 'react';
import {
	Text,
	View,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import styles from '../styles';

class DetailsScreen extends Component {
	static navigationOptions = { title: 'Details' };
	render() {
		return (
		  <View style={styles.global.content}>
		    <Text>
		    Meggings hohoho single-origin coffjhk jkjh kjh ee crucifix meh chicharrones plaid lumbersexual. Pop-up pinterest sriracha chicharrones tumblr pickled ramps meggings. DIY austin lomo post-ironic. Vinyl kogi godard, messenger bag tattooed post-ironic cronut. Kickstarter knausgaard beard raclette fanny pack. Yr authentic master cleanse banjo lo-fi etsy, health goth tote bag art party copper mug tattooed vinyl fingerstache keytar. 
		    </Text>
		  </View>  			
		);
	}
}

export default DetailsScreen;