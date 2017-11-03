import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import DetailsScreen from './component/DetailsScreen';
import SearchInput from './component/SearchInput';
import HeaderRight from './component/HeaderRight';
import HomeScreen from './component/HomeScreen';
import MediaDetailView from './component/MediaDetailView';

const RootNavigator = StackNavigator({
	Home: { screen: HomeScreen },
	Details: { screen: MediaDetailView }
});

export default RootNavigator;
