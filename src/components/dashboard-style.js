import React from 'react';
import {
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';


const {height, width} = Dimensions.get('window')

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    alignItems: 'flex-start',
    position: 'relative',
    backgroundColor: 'white',
  },
  heading: {
    alignSelf: "stretch",
    paddingTop: 5,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 5,
    backgroundColor: '#1a396b',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 50,
  },
  menuTextContainer: {
    position: 'relative',
    marginLeft: 20,
  },
  headingTextContainer: {
    position: 'absolute',
    top: -15,
    left: 0,
    width: width - 70,
    height: 30
  },
  searchContainer: {
    position: 'absolute',
    top: -25,
    left: 0,
    width: width - 70,
    height: 50,
  },
  searchInput: {
    color: 'white',
    fontSize: 20
  },
  headingText:{
    fontSize: 20,
    color: '#fff'
  },
  menuIcon: {
    position: 'relative',
    width: 20,
    height: 20,
  },
  leftMenu: {
    backgroundColor: 'white',
    position: 'absolute',
    left: (width - 60) * -1,
    top: 0,
    width: width - 60,
    height: height
  },
  leftMenuOpen: {
    left: 0
  },
  listView: {
    alignSelf: "stretch"
  },
  searchIconContainer: {
    flexDirection: 'row',
    position: 'absolute',
    right: 5,
  },
  emptyDashMessage: {
    padding: 20
  },
  arrowIcon: {
    opacity: 0,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  barsIcon: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  arrowIconVisible: {
    transform: [{rotate: '180deg'}],
    opacity: 1,
  },
  barsIconVisible: {
    transform: [{rotate: '180deg'}],
    opacity: 0
  }
});