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
import TimerMixin from 'react-timer-mixin';
import styles from './styles';

let API_URL = 'https://itunes.apple.com/search';

let LOADING = {};

let resultsCache = {
	dataForQuery: {}
};

class HomeScreen extends Component {
	mixins: [TimerMixin],

	timeoutID: (null: any);

	_urlForQuery: function (query: string): string {
		if (query) {
			return API_URL + '?media=movie&term=' + encodeURIComponent(query);
		} else {
			return API_URL + '?media=movie&term=mission+impossible';
		}
	};

	searchMedia: (query: string) => {
		this.timeoutID = null;
		
		let cachedResultsForQuery = resultsCache.dataForQuery[query];
		if (cachedResultsForQuery) {
			if (!LOADING[query]) {
				Alert.alert('Number of Results', cachedResultsForQuery.length + ' cached results');
			}
		} else {
			LOADING[query] = true;
			resultsCache.dataForQuery[query] = null;

			fetch(this._urlForQuery(query))
				.then((response) => response.json())
				.catch((error) => {
					LOADING[query] = false;
					resultsCache.dataForQuery[query] = undefined;
				})
				.then((responseData) => {
					LOADING[query] = false;
					resultsCache.dataForQuery[query] = responseData.results;

					Alert.alert('Number of Results', responseData.resultCount + ' results');
				});
		}
	},
	
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
		    		
		    		this.clearTimeout(this.timeoutID);
		    		this.timeoutID = this.setTimeout(() => this.searchMedia(searchString));
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
