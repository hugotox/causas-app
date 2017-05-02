import React, { Component } from 'react'
import {
  View,
  TextInput,
} from 'react-native'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/sync';
import StyledText from './styled-text.js'
import Button from './button'
import styles from './comentarios-style'

class Comentarios extends Component {
  constructor(){
    super()
    this.state = {
      comments: ''
    }
  }
  sendComments() {
    if(this.state.comments !== '') {
      this.props.sendComments(this.props.rut, this.state.comments)
        .then(resp => {
          if(resp.data.success) {
            alert('Muchas gracias!')
            this.setState({comments: ''})
          }
        })
    }
  }
  render () {
    return (
      <View style={styles.container}>
        <StyledText>
          Tu opinión es muy importante para poder mejorar este servicio. {'\n'}
          No dudes en enviarnos cualquier sugerencia, solicitud de nuevas funciones
          o ideas para hacer esta app aún más útil.
        </StyledText>

        <View style={styles.inputContainer}>
          <TextInput
          multiline
          style={styles.input}
          onChangeText={(comments) => this.setState({comments})}
        />
        </View>

        <Button
          onPress={this.sendComments.bind(this)}
          disableButton={this.props.sendingComments}
        >
          <StyledText style={styles.button}>Enviar</StyledText>
        </Button>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return state
}

const mapActionsToProps = dispatch => {
  return {
    sendComments: bindActionCreators(actions.sendComments, dispatch)
  }
}

export default connect(mapStateToProps, mapActionsToProps)(Comentarios)