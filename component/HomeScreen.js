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
import MediaCell from './MediaCell';
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

	componentWillMount() {
		this.searchMedia('mission impossible');
	}

	getDataSource(mediaItems: string) {
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});
		return ds.cloneWithRows(mediaItems);
	}

	static navigationOptions = ({ navigation }) => ({
		title: 'Movie Browser List'
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
					return responseData.results.filter((e) => e.wrapperType !== 'collection');
				})
				.then((responseData) => {
					LOADING[searchString] = false;
					resultsCache.dataForQuery[searchString] = responseData;

					this.setState({
						isLoading: false,
						resultsData: this.getDataSource(resultsCache.dataForQuery[searchString])
					});
				});
		}
	}

	renderSeparator(
		sectionID: number | string, 
		rowID: number | string, 
		adjacentRowHighlighted: boolean) {

		return (
			<View
				key={"SEP_" + sectionID + "_" + rowID}
				style={[styles.global.rowSeparator, adjacentRowHighlighted && styles.global.rowSeparatorHighlighter]}
			/>
		);

	}

	renderRow(media: Object, sectionID: number | string, rowID: number | string, highlightRowFunction: (sectionID: ?number | string, rowID: ?number | string) => void) {
		
		return (
			<MediaCell
				media={media}
				onSelect={() => this.selectMediaItem(media)}
				onHighlight={() => highlightRowFunction(sectionID, rowID)}
				onDehighlight={() => highlightRowFunction(null, null)}
			/>
		);		
	
	}
	
	selectMediaItem(mediaItem) {
		this.props.navigation.navigate('Details', mediaItem);
	}

	handleChange(event) {
		let root = this;
		let searchString = event.nativeEvent.text;
		setTimeout(function() {
			root.searchMedia(searchString);
		}, 1000);
	}				

	render() {

		let showList = "";
		let content = "";

		if (this.state.isLoading) {

			showList = (
				<View style={{flex: 1, paddingTop: 20}}>
					<ActivityIndicator />		      		
		    	</View>
		    );

		} else {
			
			if(this.state.resultsData.getRowCount() === 0) {

				let text = "";

				if(!this.state.isLoading && this.state.query) {
					text = "No movies found for '" + this.state.query + "'.";
				} else if (!this.state.isLoading) {
					text = "No movies found.";
				}

				content = <View style={styles.global.emptyList}>
					<Text style={styles.global.emptyListText}>{ text }</Text>
				</View>;

				showList = content;

			} else {

				showList = (
					<ListView
			          dataSource={this.state.resultsData}
			          renderRow={this.renderRow.bind(this)}
			          renderSeparator={this.renderSeparator}
			          automaticallyAdjustContentInsets={true}
			          contentInset={{bottom:49}}
			          contentContainerStyle={{paddingBottom: 60}} 
			          enableEmptySections
			        />
				);
			
			}

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
			</View>
			<View>
			{ showList }
			</View> 
		  </View>			
		);
	}
}

export default HomeScreen;