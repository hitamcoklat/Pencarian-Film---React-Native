import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Button,
	TextInput,
	Alert,
	ActivityIndicator,
	ListView }
from 'react-native';
import { StackNavigator } from 'react-navigation';
import styles from '../styles';

let API_URL = 'https://itunes.apple.com/search';
let LOADING = {};
let resultsCache = {
	dataForQuery: {}
};

class HomeScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
		 	isLoading: true,
		 	query: '',
		 	resultsData: []
		}
	}

	componentDidMount() {
		this.searchMedia('mission impossible');
	}

	getDataSource(mediaItems: string) {
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});
		return ds.cloneWithRows(mediaItems);
	}

	static navigationOptions = ({ navigation }) => ({
		title: 'Movie Browser List',
		headerRight:<Button onPress={() => this.props.navigation.navigate('Details')} title="Search" />
	});

	_urlForQuery(query) {
		if (query.length > 2) {
			return API_URL + '?media=movie&term=' + encodeURIComponent(query);
		}
	}

	searchMedia(query: string) {

		let searchString = query;

		this.timeoutID = null;
		this.setState({ query: searchString });

		let cachedResultsForQuery = resultsCache.dataForQuery[searchString];

		if (cachedResultsForQuery) {
			console.log(LOADING);
			if (!LOADING[searchString]) {
				this.setState({
					isLoading: false,
					resultsData: this.getDataSource(cachedResultsForQuery)
				});
			} else {
				this.setState({
					isLoading: true
				});
			}
		} else {
			
			let queryURL = this._urlForQuery(searchString);
			
			if (!queryURL) return false;
			
			this.setState({
				isLoading: true
			});
			
			LOADING[searchString] = true;
			resultsCache.dataForQuery[searchString] = null;
			
			fetch(queryURL)
				.then((response) => response.json())
				.catch((error) => {
					LOADING[searchString] = false;
					resultsCache.dataForQuery[searchString] = undefined;
					this.setState({
						isLoading: false,
						resultsData: this.getDataSource([])
					});
				})
				.then((responseData) => {
					LOADING[searchString] = false;
					resultsCache.dataForQuery[searchString] = responseData.results;

					this.setState({
						isLoading: false,
						resultsData: this.getDataSource(resultsCache.dataForQuery[searchString])
					});
				});
		}
	}
	

	handleChange(event) {
		let root = this;
		let searchString = event.nativeEvent.text;
		setTimeout(function() {
			root.searchMedia(searchString);
		}, 250);
	}				

	render() {

		if (this.state.isLoading) {
		  return (
		    <View style={{flex: 1, paddingTop: 20}}>
		      <ActivityIndicator />
		    </View>
		  );
		}

		return (
		  <View style={styles.global.mainContainer}>
			<View isLoading={this.state.isLoading} style={styles.global.searchBar}>
				<TextInput
					autoCapitalize="none"
					autoCorrect={false}
					placeholder="Search for media on iTunes..."
					returnKeyType="search"
					enablesReturnKeyAutomatically={true}
					style={styles.global.searchBarInput}
					onChange={this.handleChange.bind(this)}
				/>
				<ActivityIndicator
					animating={this.state.isLoading}
					style={styles.global.spinner}
				/>
			</View>
			<View>
		        <ListView
		          dataSource={this.state.resultsData}
		          renderRow={(rowData) => <Text>{rowData.trackName}, {rowData.primaryGenreName}</Text>}
		        />	
			</View> 
		  </View>			
		);
	}
}

export default HomeScreen;