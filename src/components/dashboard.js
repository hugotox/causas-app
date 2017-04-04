import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ListView,
  RefreshControl,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LeftMenu from './left-menu.js'
import * as actions from '../actions/sync.js'
import StyledText from './styled-text.js'
import Notification from './notification.js'


class Dashboard extends Component {

  constructor() {
    super()
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      refreshing: false,
      dataSource: null,
      page: 1,
    }
  }

  fetchData() {
    return this.props.dispatch(
      actions.triggerfetchNotifications(this.props.rut, this.props.clave, this.state.page)
    )
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.fetchData().then(() => {
      this.setState({refreshing: false});
    });
  }

  componentDidMount() {
    this.fetchData()
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.notifications) {
      this.setState({dataSource: this.ds.cloneWithRows(nextProps.notifications)})
    }
  }

  renderNotification(notification) {
    return (
      <Notification notification={notification}/>
    )
  }

  showMenu() {

  }

  render() {
    if(this.props.fetchNotifications) {
      return (
        <View style={styles.container}>
          <StyledText>Cargando datos...</StyledText>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <TouchableOpacity onPress={this.showMenu.bind(this)}>
            <Icon name="bars" size={20} color="#fff" style={styles.menuIcon}/>
          </TouchableOpacity>
          <StyledText style={styles.headingText}>Últimos documentos recibidos</StyledText>
        </View>
        { this.state.dataSource &&
          <ListView
            style={styles.listView}
            dataSource={this.state.dataSource}
            renderRow={this.renderNotification.bind(this)}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
              />
            }
          />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    alignItems: 'flex-start',
  },
  heading: {
    alignSelf: "stretch",
    paddingTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 20,
    backgroundColor: '#1a396bdd',
    flexDirection: 'row',
    alignItems: 'center'
  },
  headingText:{
    fontSize: 20,
    color: '#fff'
  },
  menuIcon: {
    marginRight: 20,
  },
  leftMenu: {
    backgroundColor: 'white',
  },
  listView: {
    alignSelf: "stretch"
  }
});

const mapStateToProps = state => {
  return {
    rut: state.rut,
    clave: state.clave,
    notifications: state.notifications,
    fetchNotifications: state.fetchNotifications
  }
}

export default connect(mapStateToProps)(Dashboard)
