
/*
Get current weekday
This function returns current weekday name

Input:
-

Output:
day + month - string
*/

const months = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
]

export default function () {
  const date = new Date()
  return date.getDate() + " " + months[date.getMonth()]
}