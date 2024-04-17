
/*
Get current weekday
This function returns current weekday name

Input:
-

Output:
weekday - string
*/

const weekdays = ['Понедельник','Вторник','Среда','Четверг','Пятница','Суббота', 'Воскресенье']

export default function () {
  const date = new Date()
  return weekdays[date.getDay()-1]
}