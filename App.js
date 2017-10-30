import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Button,
	TextInput,
	Alert,
	ActivityIndicator
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import styles from './styles';

let API_URL = 'https://itunes.apple.com/search';

let LOADING = {};

let resultsCache = {
	dataForQuery: {}
};

class HomeScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			query: '',			
			resultsData: []
		};
	}

	static navigationOptions = ({ navigation }) => ({
		title: 'Movie Browser List',
		headerRight: <HeaderRight navigation={ navigation } />
	});	
	
	render() {
		
		const { navigate } = this.props.navigation;
		timeoutID: (null: any);

		function _urlForQuery(query) {
			if (query.length > 2) {
				return API_URL + '?media=movie&term=' + encodeURIComponent(query);
			}
		}

		function searchMedia(query) {

			this.timeoutID = null;
			this.setState({ query: query });

			let cachedResultsForQuery = resultsCache.dataForQuery[query];
			if (cachedResultsForQuery) {
				if (!LOADING[query]) {
					this.setState({
						isLoading: false,
						resultsData: cachedResultsForQuery
					});
				} else {
					this.setState({
						isLoading: true
					});
				}
			} else {

				let queryURL = _urlForQuery(query);

				if (!queryURL) return false;

				this.setState({
					isLoading: true
				});

				LOADING[query] = true;
				resultsCache.dataForQuery[query] = null;

				fetch(queryURL)
					.then((response) => response.json())
					.catch((error) => {
						LOADING[query] = false;
						resultsCache.dataForQuery[query] = undefined;

						this.setState({
							isLoading: false
						});
					})
					.then((responseData) => {
						LOADING[query] = false;
						resultsCache.dataForQuery[query] = responseData.results;

						this.setState({
							isLoading: false,
							resultsData: resultsCache.dataForQuery[query]
						});
					});
			}
		}
		
		return (
		  <View style={styles.global.mainContainer}>
		    <SearchInput
		    	isLoading={this.state.isLoading}
		    	onSearch={(event) => {
		    		let searchString = event.nativeEvent.text;
		    		setTimeout(function(){ searchMedia(searchString) }, 250);
		    	}}
		    />
		    <Text>
		    Meggingasdasds hohoho single-origin coffjhk jkjh kjh ee crucifix meh chicharrones plaid lumbersexual. Pop-up pinterest sriracha chicharrones tumblr pickled ramps meggings. DIY austin lomo post-ironic. Vinyl kogi godard, messenger bag tattooed post-ironic cronut. Kickstarter knausgaard beard raclette fanny pack. Yr authentic master cleanse banjo lo-fi etsy, health goth tote bag art party copper mug tattooed vinyl fingerstache keytar. 
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
					onChange={this.props.onSearch.bind(this)}
				/>
				<ActivityIndicator
					animating={this.props.isLoading}
					style={styles.global.spinner}
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
