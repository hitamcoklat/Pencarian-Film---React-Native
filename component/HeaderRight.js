import React, { Component } from 'react';
import {
	Text,
	View,
	Button
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import styles from '../styles';

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

export default HeaderRight;