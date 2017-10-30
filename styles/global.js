import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  content: {
    flex: 1,
    backgroundColor: '#EFEFEF'
  },
  searchBar: {
  	padding: 3,
  	paddingLeft: 8,
  	flexDirection: 'row',
  	backgroundColor: '#FFF',
  },
  searchBarInput: {
  	fontSize: 15,
  	flex: 1,
  	height: 60,
  }
});