import React, { Component } from 'react';
import {
	Image,
	ScrollView,
	Text,
	TouchableHighlight,
	View
} from 'react-native';

class MediaDetailView extends Component {
	render() {
		console.log(this.props.navigation.state.params);
		return (
			<View></View>
		);
	}
}

export default MediaDetailView;