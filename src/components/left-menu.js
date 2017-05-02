import React, { Component } from 'react'
import {
  View,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import StyledText from './styled-text.js'
import style from './left-menu-style'
import Variables from '../styles/variables'

class LeftMenu extends Component {
  render () {
    const { selectedItem, onItemSelected } = this.props
    return (
      <View style={style.container}>
        <StyledText style={style.heading}>Menu</StyledText>

          <View style={style.separator}/>

          <TouchableOpacity style={[style.link, selectedItem === 'notificaciones' ? style.linkSelected : null]}
            onPress={ onItemSelected.bind(this, 'notificaciones') }>
            <View style={style.linkIcon}>
              <Icon name="bell" size={20} color={Variables.textColor}/>
            </View>
            <StyledText>Ver notificaciones{'\n'}recibidas</StyledText>
          </TouchableOpacity>

          <View style={style.separator}/>

        {/*
          <TouchableOpacity style={[style.link, selectedItem === 'actualizar' ? style.linkSelected : null]}
            onPress={ onItemSelected.bind(this, 'actualizar') }>
            <View style={style.linkIcon}>
              <Icon name="lock" size={20} color={Variables.textColor}/>
            </View>
            <StyledText>Actualizar Clave</StyledText>
          </TouchableOpacity>
        */}

          <TouchableOpacity style={[style.link, selectedItem === 'comentarios' ? style.linkSelected : null]}
            onPress={ onItemSelected.bind(this, 'comentarios') }>
            <View style={style.linkIcon}>
              <Icon name="mail-reply" size={20} color={Variables.textColor}/>
            </View>
            <StyledText>Enviar comentarios{'\n'}y/o sugerencias</StyledText>
          </TouchableOpacity>

          <View style={style.separator}/>

          <TouchableOpacity style={[style.link, selectedItem === 'logout' ? style.linkSelected : null]}
            onPress={ onItemSelected.bind(this, 'logout') }>
            <View style={style.linkIcon}>
              <Icon name="sign-out" size={20} color={Variables.textColor}/>
            </View>
            <StyledText>Cerrar sesión</StyledText>
          </TouchableOpacity>

      </View>
    )
  }
}

export default LeftMenu
