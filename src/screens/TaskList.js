import React,{Component} from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';

import moment from 'moment';
import 'moment/locale/pt-br';

import todayImage from '../../assets/imgs/today.jpg';
import commonStyles from '../styles/commonStyles';
import Task from '../components/Task'

export default class TaskList extends Component{
  render(){
    const today = moment().locale('pr-br').format('ddd, D [de] MMMM')
    return(
      <View style={styles.container}>
        <ImageBackground source={todayImage} style={styles.background}>
          <View style={styles.titleBar}>
            <Text style={styles.title}>Hoje</Text>
            <Text style={styles.subTitle}>{today}</Text>
          </View>
        </ImageBackground>
        <View style={styles.taskList}>
          <Task desc='Comprar mouse' estimateAt={new Date()} doneAt={new Date()}/>
          <Task desc='chegar mouse' estimateAt={new Date()} doneAt={null}/>
          <Task desc='mouse' estimateAt={new Date()} doneAt={"24/05/2032"}/>
        </View>
      </View>
    )
  } 
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  background:{
    flex: 3
  },
  taskList:{
    flex: 7
  },
  titleBar:{
    flex: 1,
    justifyContent: 'flex-end',
  },
  title:{
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 50,
    marginLeft: 20,
    marginBottom: 20,
  },
  subTitle:{
    fontFamily:  commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 20,
  }
})