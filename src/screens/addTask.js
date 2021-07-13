import React,{Component} from 'react';
import {Modal,View,StyleSheet,TouchableWithoutFeedback, Text, TouchableOpacity, TextInput, Platform} from 'react-native'

import commonStyles from '../styles/commonStyles';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const initialState = {desc: "", date: new Date(), showDatePicker: false}

export default class AddTask extends Component{

  state={
    ...initialState
  }

  save = () =>{
    const newTask = {
      desc: this.state.desc,
      date: this.state.date
    }
    this.props.onSave && this.props.onSave(newTask)
    this.setState({...initialState})
  }

  getDatePicker = ()=>{
    let datePicker = <DateTimePicker testID={this.state.date} value={this.state.date} onChange={(_,date)=>this.setState({date, showDatePicker:false})} mode='date'/>
    
    const dateString = moment(this.state.date).format('ddd, D [de] MMMM YYYY')

    if(Platform.OS === 'android'){
      datePicker = (
        <View style={styles.date}>
          <TouchableOpacity onPress={()=>{this.setState({showDatePicker: true})}}>
            <Text>{dateString}</Text>
          </TouchableOpacity>
          {this.state.showDatePicker && datePicker}
        </View>
      ) 
    }

    return datePicker
  }

  render(){
    return(
      <Modal transparent={true} visible={this.props.isVisible} onRequestClose={this.props.onCancel} animationType='slide'>
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.background}></View>
        </TouchableWithoutFeedback>
        <View style={styles.container}>
          <Text style={styles.header}> Nova Tarefa </Text>
          <TextInput style={styles.input} placeholder='Nova tarefa' onChangeText={(desc)=>{this.setState({desc})}} value={this.state.desc}/>
          {this.getDatePicker()}
          <View style={styles.buttons}> 
            <TouchableOpacity onPress={this.props.onCancel}>
              <Text style={styles.button}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity >
              <Text style={styles.button} onPress={this.save}>Salvar</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: '#fff'
  },
  header:{
    fontFamily: commonStyles.fontFamily,
    backgroundColor: commonStyles.colors.today,
    fontSize: 20,
    textAlign: 'center',
    padding: 15,
    color: commonStyles.colors.secondary
  },
  input:{
    fontFamily: commonStyles.fontFamily,
    height: 40,
    margin: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e3e3e3',
    borderRadius: 6,
  },
  buttons:{
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button:{
    margin:20,
    marginRight: 30,
    color: commonStyles.colors.today
  },
  date:{
    fontFamily: commonStyles.fontFamily,
    fontSize: 20,
    marginLeft: 15,
  }
})