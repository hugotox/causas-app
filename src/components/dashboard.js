import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  ListView,
  RefreshControl,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable'
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
      searchVisible: false
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

  toggleSearch() {
    if(!this.state.searchVisible) {
      this.refs['1'].focus()
    } else {
      this.refs['1'].blur()
      this.props.dispatch(actions.filterNotifications(''))
    }
    this.setState({searchVisible: !this.state.searchVisible})
  }

  changeSearchTerm(value) {
    this.props.dispatch(actions.filterNotifications(value))
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
          {/*<TouchableOpacity onPress={this.showMenu.bind(this)}>
            <Icon name="bars" size={20} color="#fff" style={styles.menuIcon}/>
          </TouchableOpacity>*/}
          <View style={{position: 'relative'}}>
            <Animatable.View transition={['opacity']}
              style={[styles.headingTextContainer, { opacity: this.state.searchVisible ? 0 : 1 }]}>
              <StyledText style={styles.headingText}>Últimos documentos recibidos</StyledText>
            </Animatable.View>
            <Animatable.View transition={['opacity']}
              style={[styles.searchContainer, { opacity: this.state.searchVisible ? 1 : 0 }]}>
              <TextInput placeholder=''
                ref="1"
                style={[styles.searchInput]}
                value={this.props.searchTerm}
                blurOnSubmit={false}
                onChangeText={this.changeSearchTerm.bind(this)}
                underlineColorAndroid="transparent"
                placeholderTextColor={Variables.placeholderTextColor}
              />
            </Animatable.View>
          </View>
          <View style={styles.searchIconContainer}>
            <TouchableOpacity style={{padding: 15}} ref='search'
              onPress={this.toggleSearch.bind(this)}>
              <Icon name={this.state.searchVisible ? 'close' : "search"} size={20} color="#fff" style={styles.menuIcon}/>
            </TouchableOpacity>
          </View>
        </View>

        {this.props.notifications.length === 0 && this.props.searchTerm === '' &&
          <View>
            <StyledText>Las notificaciones aparecerán en esta sección una vez que nuestro sistema identifique nuevos documentos en tus causas.</StyledText>
          </View>
        }

        { this.state.dataSource &&
          <ListView
            style={styles.listView}
            dataSource={this.state.dataSource}
            renderRow={this.renderNotification.bind(this)}
            enableEmptySections={true}
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

const {height, width} = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    alignItems: 'flex-start',
  },
  heading: {
    alignSelf: "stretch",
    paddingTop: 5,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 5,
    backgroundColor: '#1a396bdd',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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

  },
  leftMenu: {
    backgroundColor: 'white',
  },
  listView: {
    alignSelf: "stretch"
  },
  searchIconContainer: {
    flexDirection: 'row',
  }
});

const mapStateToProps = state => {
  return {
    rut: state.rut,
    clave: state.clave,
    notifications: state.filteredNotifications,
    fetchNotifications: state.fetchNotifications,
    searchTerm: state.searchTerm
  }
}

export default connect(mapStateToProps)(Dashboard)
