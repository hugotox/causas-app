import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  TextInput,
  ListView,
  RefreshControl,
  Platform,
} from 'react-native';
import SideMenu from 'react-native-side-menu';
import Header from './header'
import * as Animatable from 'react-native-animatable'
import Comentarios from './comentarios'
import ActualizarClave from './actualizar-clave.js'
import LeftMenu from './left-menu.js'
import * as actions from '../actions/sync.js'
import StyledText from './styled-text.js'
import Notification from './notification.js'
import styles from './dashboard-style'
import Variables from '../styles/variables'

class Dashboard extends Component {

  constructor() {
    super()
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.initialFetchInterval = ''
    this.state = {
      refreshing: false,
      dataSource: null,
      page: 1,
      searchVisible: false,
      menuOpen: false,
      selectedItem: 'notificaciones'
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
    this.initialFetchInterval = setInterval(() => {
      console.log('fetching...')
      this.fetchData()
    }, 60 * 60 * 1000)  // fetch every one hour
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.notifications) {
      this.setState({dataSource: this.ds.cloneWithRows(nextProps.notifications)})
      clearInterval(this.initialFetchInterval)
    }
  }

  renderNotification(notification) {
    return (
      <Notification notification={notification}/>
    )
  }

  toggleSearch() {
    if (!this.state.searchVisible) {
      this.refs[ '1' ].focus()
    } else {
      this.refs[ '1' ].blur()
      this.props.dispatch(actions.filterNotifications(''))
    }
    this.setState({searchVisible: !this.state.searchVisible})
  }

  changeSearchTerm(value) {
    this.props.dispatch(actions.filterNotifications(value))
  }

  toggleMenu() {
    this.setState({menuOpen: !this.state.menuOpen})
  }

  updateMenuState(menuOpen) {
    this.setState({menuOpen});
  }

  onMenuItemSelected = (item) => {
    this.setState({
      menuOpen: false,
      selectedItem: item,
    });
    if (item === 'logout') {
      this.props.dispatch(actions.logout(this.props.rut, this.props.playerId))
    }
  }

  render() {
    if (this.props.fetchNotifications) {
      return (
        <View style={styles.container}>
          <StyledText>Cargando datos...</StyledText>
        </View>
      )
    }

    let contents
    switch (this.state.selectedItem) {
      case 'notificaciones': {
        contents = (
          <View style={styles.contents}>
            <Header
              showSearch
              toggleMenu={this.toggleMenu.bind(this)}
              menuOpen={this.state.menuOpen}
              toggleSearch={this.toggleSearch.bind(this)}
              searchVisible={this.state.searchVisible}
            >
              <View style={styles.menuTextContainer}>
                <Animatable.View
                  transition={[ 'opacity' ]}
                  style={[ styles.headingTextContainer, {opacity: this.state.searchVisible ? 0 : 1} ]}>
                  <StyledText style={styles.headingText}>Últimas notificaciones</StyledText>
                </Animatable.View>
                <Animatable.View
                  transition={[ 'opacity' ]}
                  style={[ styles.searchContainer, {opacity: this.state.searchVisible ? 1 : 0} ]}>
                  <TextInput
                    placeholder=''
                    ref="1"
                    style={[ styles.searchInput, Platform.OS === 'ios' ? {height: 30} : null ]}
                    value={this.props.searchTerm}
                    blurOnSubmit={false}
                    onChangeText={this.changeSearchTerm.bind(this)}
                    underlineColorAndroid="transparent"
                    placeholderTextColor={Variables.placeholderTextColor}
                  />
                </Animatable.View>
              </View>

            </Header>

            { this.props.notifications.length === 0 && this.props.searchTerm === '' &&
            <View>
              <StyledText style={styles.emptyDashMessage}>
                Las notificaciones aparecerán en esta sección una vez que nuestro sistema identifique nuevos documentos
                en tus causas.
              </StyledText>
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
        )
        break
      }

      // case 'actualizar': {
      //   contents = (
      //     <View style={styles.contents}>
      //       <Header
      //         toggleMenu={this.toggleMenu.bind(this)}
      //         menuOpen={this.state.menuOpen}
      //         toggleSearch={this.toggleSearch.bind(this)}
      //         searchVisible={this.state.searchVisible}
      //       >
      //         <StyledText style={[styles.headingText, { marginLeft: 15 }]}>Actualizar clave</StyledText>
      //       </Header>
      //       <ActualizarClave/>
      //     </View>
      //   )
      //   break
      // }

      case 'comentarios': {
        contents = (
          <View style={styles.contents}>
            <Header
              toggleMenu={this.toggleMenu.bind(this)}
              menuOpen={this.state.menuOpen}
              toggleSearch={this.toggleSearch.bind(this)}
              searchVisible={this.state.searchVisible}
            >
              <StyledText style={[styles.headingText, { marginLeft: 15 }]}>Enviar comentarios</StyledText>
            </Header>
            <Comentarios/>
          </View>
        )
        break
      }

      default:
        contents = (
          <View style={styles.contents}>
            <StyledText>Not implemented</StyledText>
          </View>
        )
    }

    const menu = <LeftMenu
      onItemSelected={this.onMenuItemSelected}
      selectedItem={this.state.selectedItem}
    />

    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.menuOpen}
        onChange={(menuOpen) => this.updateMenuState(menuOpen)}>
        <View style={styles.container}>
          { contents }
        </View>
      </SideMenu>
    );
  }
}

const mapStateToProps = state => {
  return {
    rut: state.rut,
    clave: state.clave,
    notifications: state.filteredNotifications,
    fetchNotifications: state.fetchNotifications,
    searchTerm: state.searchTerm,
    playerId: state.playerId,
  }
}

export default connect(mapStateToProps)(Dashboard)
