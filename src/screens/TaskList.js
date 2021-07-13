import React,{Component} from 'react';
import {View, Text, ImageBackground, StyleSheet, FlatList, TouchableOpacity, Platform, Alert} from 'react-native';

import moment from 'moment';
import 'moment/locale/pt-br';

import todayImage from '../../assets/imgs/today.jpg';
import commonStyles from '../styles/commonStyles';
import Task from '../components/Task';
import AddTask from './addTask';

import Icon from 'react-native-vector-icons/FontAwesome'

export default class TaskList extends Component{

  state = {

    showDoneTasks: true,
    visibleTasks:[],
    showAddTask: false,

    tasks:[{
      id: Math.random(),
      desc: 'Comprar Livro React-Native',
      estimateAt: new Date(),
      doneAt: new Date(),
    },
    {
      id: Math.random(),
      desc: 'Comprar Livro React-Native',
      estimateAt: new Date(),
      doneAt:null,
    }]
  }

  componentDidMount = ()=>{
    this.filterTasks()
  }

  toggleFilter = () =>{
    this.setState({showDoneTasks: !this.state.showDoneTasks}, this.filterTasks)
  }

  filterTasks=()=>{
    let visibleTasks = null;;
    if (this.state.showDoneTasks){
      visibleTasks = [...this.state.tasks] 
    }else{
      const pending = task => task.doneAt === null
      visibleTasks = this.state.tasks.filter(pending)
    }

    this.setState({visibleTasks})
  }

  
  toggleTask = (taskId) => {
    const tasks = [...this.state.tasks]
    tasks.forEach(task => {
      if(task.id === taskId){
        task.doneAt = task.doneAt ? null : new Date()
      }
    })
    this.setState({tasks},this.filterTasks)
  }

  addTask = newTask => {
    if(!newTask.desc || !newTask.desc.trim()){
      Alert.alert('Erro', 'Adicione uma tarefa');
      return
    }
    const tasks = [...this.state.tasks];
    tasks.push({
      id: Math.random(),
      desc: newTask.desc,
      estimateAt: newTask.date,
      doneAt: null,
    })

    this.setState({tasks, showAddTask: false}, this.filterTasks)
  }

  render(){
    const today = moment().locale('pr-br').format('ddd, D [de] MMMM')
    return(
      <View style={styles.container}>
        <AddTask isVisible={this.state.showAddTask} onCancel={()=>{this.setState({showAddTask:false})}} onSave={this.addTask}/>
        <ImageBackground source={todayImage} style={styles.background}>
          <View style={styles.iconBar}>
            <TouchableOpacity onPress={this.toggleFilter}>
              <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'} size={20} color={commonStyles.colors.secondary}/>
            </TouchableOpacity>
          </View>
          <View style={styles.titleBar}>
            <Text style={styles.title}>Hoje</Text>
            <Text style={styles.subTitle}>{today}</Text>
          </View>
        </ImageBackground>
        <View style={styles.taskList}>
          <FlatList data={this.state.visibleTasks} 
          keyExtractor={(item) => `${item.id}`} 
          renderItem={({item})=> <Task {...item} toggleTask={this.toggleTask}/> } />
        </View>
        <TouchableOpacity style={styles.addButton} onPress={()=>{this.setState({showAddTask: true})}} activeOpacity={0.7}>
          <Icon name='plus' size={20} color={commonStyles.colors.secondary}/>
        </TouchableOpacity>
      </View>
    )
  } 
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  background:{
    flex: 3,
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
  },
  iconBar:{
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'flex-end',
    marginTop: Platform.OS === 'ios' ? 40 : 10
  },
  addButton:{
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: commonStyles.colors.today,
    justifyContent: 'center',
    alignItems: 'center',
  }
})