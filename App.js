import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Button,
	TextInput,
	Alert
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import styles from './styles';

class HomeScreen extends Component {
	
	static navigationOptions = ({ navigation }) => ({
		title: 'Movie Browser List',
		headerRight: <HeaderRight navigation={ navigation } />
	});	
	
	render() {
		
		const { navigate } = this.props.navigation;
		
		return (
		  <View style={styles.global.mainContainer}>
		    <SearchInput
		    	onSearch={(event) => {
		    		let searchString = event.nativeEvent.text;
		    		Alert.alert('Hasil pencarian...', searchString);
		    	}}
		    />
		    <Text>
		    Meggings hohoho single-origin coffjhk jkjh kjh ee crucifix meh chicharrones plaid lumbersexual. Pop-up pinterest sriracha chicharrones tumblr pickled ramps meggings. DIY austin lomo post-ironic. Vinyl kogi godard, messenger bag tattooed post-ironic cronut. Kickstarter knausgaard beard raclette fanny pack. Yr authentic master cleanse banjo lo-fi etsy, health goth tote bag art party copper mug tattooed vinyl fingerstache keytar. 
		    </Text>
		  </View>			
		);
	
	}
}

class HeaderRight extends Component {
	
	render() {
	
		return (
			<Button
				onPress={() => this.props.navigation.navigate('Details')}
				title="Search"
			/>
		);
	
	}
}

class SearchInput extends Component {
	render() {
		return (
			<View style={styles.global.searchBar}>
				<TextInput
					autoCapitalize="none"
					autoCorrect={false}
					placeholder="Search for media on iTunes..."
					returnKeyType="search"
					enablesReturnKeyAutomatically={true}
					style={styles.global.searchBarInput}
					onEndEditing={this.props.onSearch}
				/>
			</View>
		);
	}
}

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

const RootNavigator = StackNavigator({
	Home: { screen: HomeScreen },
	Details: { screen: DetailsScreen }
});

export default RootNavigator;
