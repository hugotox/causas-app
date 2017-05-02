import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable'
import styles from './dashboard-style'


export default class Header extends Component {
  render() {
    return (
      <View style={styles.heading}>
        <TouchableOpacity onPress={this.props.toggleMenu}>
          <View style={styles.menuIcon}>
            <Animatable.View
              transition={[ 'opacity', 'rotate' ]}
              style={[ styles.barsIcon, this.props.menuOpen ? styles.barsIconVisible : null ]}>
              <Icon name="bars" size={20} color="#fff"/>
            </Animatable.View>
            <Animatable.View
              transition={[ 'opacity', 'rotate' ]}
              style={[ styles.arrowIcon, this.props.menuOpen ? styles.arrowIconVisible : null ]}>
              <Icon name="arrow-right" size={20} color="#fff"/>
            </Animatable.View>
          </View>
        </TouchableOpacity>

        { this.props.children }

        { this.props.showSearch &&
        <View style={styles.searchIconContainer}>
          <TouchableOpacity
            style={{padding: 15}} ref='search'
            onPress={this.props.toggleSearch}>
            <Icon name={this.props.searchVisible ? 'close' : "search"} size={20} color="#fff"/>
          </TouchableOpacity>
        </View>
        }
      </View>
    )
  }
}
