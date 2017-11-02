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
  },
  spinner: {
    width: 30
  },
  rowSeparator: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    height: 1,
    marginLeft: 4
  },
  rowSeparatorHighlighter: {
    opacity: 0.0
  },
  emptyList: {
    flex: 1,
    alignItems: 'center'
  },
  emptyListText: {
    marginTop: 80,
    color: '#999'
  }
});