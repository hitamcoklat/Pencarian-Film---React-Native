import React, { Component } from 'react';
import {
	Text,
	View,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import styles from '../styles';

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
					onChange={this.props.onSearch}
				/>
				<ActivityIndicator
					animating={this.props.isLoading}
					style={styles.global.spinner}
				/>
			</View>
		);
	}
}

export default SearchInput;