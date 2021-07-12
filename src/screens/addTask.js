import React,{Component} from 'react';
import {Modal,View,StyleSheet,TouchableWithoutFeedback, Text} from 'react-native'

import commonStyles from '../styles/commonStyles';

export default class AddTask extends Component{
  render(){
    return(
      <Modal transparent={true} visible={this.props.isVisible} onRequestClose={this.props.onCancel} animationType='slide'>
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.background}></View>
        </TouchableWithoutFeedback>
        <View style={styles.container}>
          <Text style={styles.header}> Nova Tarefa </Text>
        </View>
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.background}></View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  background:{
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  container:{
    flex:1,
    backgroundColor: '#fff'
  },
  header:{
    fontFamily: commonStyles.fontFamily,
    backgroundColor: commonStyles.colors.today,
    fontSize: 20,
    textAlign: 'center',
    padding: 15,
    color: commonStyles.colors.secondary
  }
})