import React, { Component } from 'react';
import {
	Image,
	ScrollView,
	Text,
	TouchableHighlight,
	View
} from 'react-native';

import styles from '../styles';

class MediaDetailView extends Component {
	render() {

		let item = this.props.navigation.state.params;

		let buyPrice = (item.trackHdPrice && item.trackPrice) ?
			<View style={ styles.detail.mediaPriceRow }>
				<Text style={styles.detail.sectionTitle}>Buy</Text>
				<Text style={styles.detail.mediaPrice}>${item.trackHdPrice} (HD)</Text>
				<Text style={styles.detail.mediaPrice}>${item.trackPrice} (SD)</Text>
			</View> : null;

		let rentalPrice = (item.trackHdRentalPrice && item.trackRentalPrice) ?
			<View style={ styles.detail.mediaPriceRow }>
				<Text style={styles.detail.sectionTitle}>Rent</Text>
				<Text style={styles.detail.mediaPrice}>${item.trackHdRentalPrice} (HD)</Text>
				<Text style={styles.detail.mediaPrice}>${item.trackRentalPrice} (SD)</Text>
			</View> : null;			

		return (
			<ScrollView contentContainerStyle={styles.detail.contentContainer}>
				<Text style={styles.detail.mediaTitle} numberOfLines={2}>
					{ item.trackName }
				</Text>
				<View style={styles.detail.mainSection}>
					<Image
						source={{uri: item.artworkUrl100}}
						style={styles.detail.mediaImage}
					/>
					<View style={{flex: 1}}>
						<View
							style={[styles.detail.mainSection, {
								alignItems: 'center',
								justifyContent: 'space-between'
							}]}>
						<View>
							<Text style={styles.detail.mediaGenre}>{ item.primaryGenreName }</Text>
							<Text style={styles.detail.contentAdvisory}>{ item.contentAdvisoryRating }</Text>
						</View>
					</View>
					<View style={styles.detail.separator} />
					{ buyPrice }
					{ rentalPrice }
					</View>
				</View>
				<View style={styles.detail.separator} />
				<Text style={styles.detail.sectionTitle}>Description</Text>
				<Text style={styles.detail.mediaDescription}>{ item.longDescription }</Text>
			</ScrollView>
		);
	}
}

export default MediaDetailView;