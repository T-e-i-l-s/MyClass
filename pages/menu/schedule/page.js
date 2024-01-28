import { Animated, Text, View, FlatList, TouchableHighlight, Image, Dimensions } from 'react-native';
import styleSheet from './styles'
import { useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { initializeApp } from "firebase/app";
import firebaseConfig from '../../../keys/firebase.json'
import push from '../../../firebase/push'

const db = initializeApp(firebaseConfig);

export default function App(route) {

  const navigation = useNavigation()

  const days = ['monday','tuesday','wednesday','thursday','friday','saturday']
  const [day, setDay] = useState(new Date().getDay() == 0 ? 1 : new Date().getDay())
  const [dayName, setDayName] = useState(days[day-1])

  const schedule = route.data.data.schedule
  const devMode = route.data.data.devMode.active

  const [currentSchedule, setCurrentSchedule] = useState(schedule[days[day-1]])
  
  const [theme, setTheme] = useState(require('../../../themes/dark.json'))
  const [styles, setStyles] = useState(styleSheet(theme))

  const [reloadFlatList, setReloadFlatList] = useState(0)

  const scheduleOpacity = useRef(
    new Animated.Value(1)
  ).current

  const changeDay = (num) => {
    setDay(num)
    setDayName(days[num-1])
    const duration = 150
    Animated.timing(scheduleOpacity, {
      toValue: 0,
      duration: duration,
      useNativeDriver: true
    }).start()
    setTimeout(() => {
      setCurrentSchedule(schedule[days[num-1]])
      Animated.timing(scheduleOpacity, {
        toValue: 1,
        duration: duration,
        useNativeDriver: true
      }).start()
    },duration)
  }

  const deleteData = (ind) => {
    let timetable = currentSchedule
    timetable.splice(ind,1)
    setCurrentSchedule(timetable)
    setReloadFlatList(reloadFlatList + 1)
    let result = route.data
    result.data.schedule[dayName] = timetable
    push(db, 'MyClass', 'Timetable', dayName, currentSchedule)
  }

  return (
    <View style={styles.container}>
      
      <View style={styles.daysRow}>
        <FlatList
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flex:1, justifyContent: 'center'}}
        horizontal={true}
        data={['пн','вт','ср','чт','пт','сб']}
        renderItem={({item, index}) => (
          <View onStartShouldSetResponder={() => changeDay(index+1)}>
            <Text style={[styles.day,{backgroundColor: index+1 == day ? theme.additional : theme.main}]}>{item}</Text>
          </View>
        )}/>
      </View>

      <Animated.View style={{width: '95%', opacity: scheduleOpacity, alignItems:'center'}}>
        {
          currentSchedule.length == 0 && !devMode ? (
            <View style={{width: '60%'}}>
              <Text style={styles.emptyTitle}>Здесь пока пусто</Text>
            </View>
          ):null
        }
        <FlatList
        extraData={reloadFlatList}
        style={{width: '100%'}}
        data={currentSchedule}
        renderItem={({item,index}) => (
          <View style={[styles.homeworkBlock, {marginBottom: 10}]}>
            <Text style={styles.index}>{index+1}</Text>
            <Text style={[styles.subject,{width: devMode ? '70%':'90%'}]}>{item}</Text>

            {
            devMode ? (
              <View style={{flexDirection: 'row', width: '20%', justifyContent: 'flex-end'}}>

                <TouchableHighlight
                underlayColor={'rgba(255, 0, 255,0)'} 
                style={styles.editButton}
                onPress={() => navigation.navigate('CreateLesson', {
                  data: route.data,
                  edit: true,
                  source: {id: index, subject: item, day: dayName}
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
          
          </View>  
        )}/>
        {
          devMode ? (
            <TouchableHighlight 
            underlayColor={'rgba(255, 0, 255,0)'}
            style={styles.addButton} 
            onPress={() => navigation.navigate('CreateLesson', {
              data: route.data,
              edit: false,
              source: {id: "", subject: "", day: dayName}
            })}>
              <Image style={styles.plusIcon} source={require('../../../assets/icons/plus.png')}/>
            </TouchableHighlight>
          ):null
        }
      </Animated.View>

    </View>
  );
}