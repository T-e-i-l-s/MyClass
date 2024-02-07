import { FlatList, Text, View, Image, TouchableHighlight, Platform } from 'react-native';
import styleSheet from './styles'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { initializeApp } from "firebase/app";
import firebaseConfig from '../../../keys/firebase.json'
import push from '../../../firebase/push'

const db = initializeApp(firebaseConfig)

export default function App(route) {

  const navigation = useNavigation()

  const [homework, setHomework] = useState(route.data.data.homework.tasks)

  const devMode = route.data.data.devMode.active

  const days1 = ['понедельник','вторник','среду','четверг','пятницу','субботу']
  const days2 = ['понедельник','вторник','среда','четверг','пятница','суббота']
  
  const [theme, setTheme] = useState(
    route.data.theme == 'dark' ? require('../../../themes/dark.json') : require('../../../themes/light.json')
  )
  const [styles, setStyles] = useState(styleSheet(theme))
  const date = new Date()
  const dateNow = [date.getDate(), date.getMonth()+1, date.getFullYear()]

  const [reloadFlatList, setReloadFlatList] = useState(0)

  const checkDate = (item) => {
    const homeworkDate = item.split('.')
    if ( dateNow[2] > parseInt(homeworkDate[2]) ||
      ( dateNow[2] == parseInt(homeworkDate[2]) && dateNow[1] > parseInt(homeworkDate[1])) ||
      ( dateNow[2] == parseInt(homeworkDate[2]) && dateNow[1] == parseInt(homeworkDate[1]) && dateNow[0] >= parseInt(homeworkDate[0]))) {
      return theme.hiddenText
    }
    return theme.additional
  }

  const deleteData = (ind) => {
    let tasks = homework
    tasks.splice(ind,1)
    setHomework(tasks)
    setReloadFlatList(reloadFlatList + 1)
    let result = route.data
    result.data.homework.tasks = homework
    push(db, 'MyClass', 'Homework', 'tasks', tasks)
  }

  const compareDates = (date1) => {
    const homeworkDate = date1.split('.')
    const unixTime1 = new Date(
      parseInt(homeworkDate[2]), 
      parseInt(homeworkDate[1] - 1), 
      parseInt(homeworkDate[0]))
    const unixTime2 = new Date(
      parseInt(dateNow[2]), 
      parseInt(dateNow[1] - 1), 
      parseInt(dateNow[0]))
    return unixTime1 - unixTime2
  }

  const getWeekDay = (date1) => {
    const homeworkDate1 = date1.split('.')
    const unixTime = new Date(
      parseInt(homeworkDate1[2]), 
      parseInt(homeworkDate1[1] - 1), 
      parseInt(homeworkDate1[0]))
    return unixTime.getDay()-1
  }

  const getTimeLine = (homeWorkDate) => {
    let dif = compareDates(homeWorkDate)/1000
    if (dif < -1 * 60 * 60 * 24) {
      return homeWorkDate
    } else if (dif < 0) {
      return 'вчера'
    } else if (dif == 0) {
      return 'сегодня'
    } else if (dif <= 60*60*24) {
      return 'завтра'
    } else if (dif < 60*60*24*7) {
      return days1[getWeekDay(homeWorkDate)]
    } else {
      return homeWorkDate.date + " (" + days2[getWeekDay(homeWorkDate)] + ")"
    }
  }

  return (
    <View style={styles.container}>
      {
        devMode ? (
          <TouchableHighlight 
          underlayColor={'rgba(255, 0, 255,0)'}
          style={styles.addButton} 
          onPress={() => navigation.navigate('CreateHomework', {
            data: route.data,
            edit: false,
            source: {id: "", subject: "", homework: "", date: ""}
          })}>
            <Image style={styles.plusIcon} source={require('../../../assets/icons/plus.png')}/>
          </TouchableHighlight>
        ):null
      }

      {
        homework.length == 0 && !devMode ? (
          <View style={{width: '60%', height: '100%', justifyContent: 'center', marginTop: Platform.OS == 'android' ? 0 : 10}}>
            <Text style={styles.emptyTitle}>Здесь пока пусто</Text>
          </View>
        ):null
      }

      <FlatList
      style={{width: '95%'}}
      extraData={reloadFlatList}
      data={homework}
      scrollEnabled={true}
      showsVerticalScrollIndicator={false}
      renderItem={({item,index}) => (
        
        <View>

          {
            index == 0 || item.date != homework[index-1].date? (
              <Text style={[styles.date,{marginTop: index == 0 && devMode ? 0 : 10}]}>На {getTimeLine(item.date)}</Text>
            ):null
          }

          <View style={[styles.homeworkBlock, {
            marginBottom: index == homework.length-1 ? 10 : 0, 
            borderLeftWidth: 4, 
            borderLeftColor: checkDate(item.date)
          }]}>
            {
              devMode ? (
                <View style={{flexDirection: 'row'}}>

                  <TouchableHighlight
                  underlayColor={'rgba(255, 0, 255,0)'} 
                  style={styles.editButton}
                  onPress={() => navigation.navigate('CreateHomework', {
                    data: route.data,
                    edit: true,
                    source: {id: index, subject: item.subject, homework: item.homework, date: item.date}
                  })}>
                    <Image style={styles.editIcon} source={require('../../../assets/icons/edit.png')}/>
                  </TouchableHighlight>

                  <TouchableHighlight 
                  underlayColor={'rgba(255, 0, 255,0)'} 
                  style={styles.editButton}
                  onPress={() => deleteData(index)}>
                    <Image style={styles.editIcon} source={require('../../../assets/icons/delete.png')}/>
                  </TouchableHighlight>

                </View>
              ):null
            }
            <Text style={styles.subject}>{item.subject}</Text>
            <Text style={styles.task}>{item.homework}</Text>
          </View>  
        </View>  
      )}/>

    </View>
  );
}