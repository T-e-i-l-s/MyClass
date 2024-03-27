
/*
CDR - Check is the date relevant
This function runs Animated.timing

Input:
date(dd.mm.yyyy)

Output:
boolean value - is relevant
*/

export default function (date) {
  const dateArray = date.split('.')
  const dateNow = [new Date().getDate(), new Date().getMonth()+1, new Date().getFullYear()]
  if ( dateNow[2] > parseInt(dateArray[2]) ||
    ( dateNow[2] == parseInt(dateArray[2]) && dateNow[1] > parseInt(dateArray[1])) ||
    ( dateNow[2] == parseInt(dateArray[2]) && dateNow[1] == parseInt(dateArray[1]) && dateNow[0] >= parseInt(dateArray[0]))) {
    return false
  }
  return true
}