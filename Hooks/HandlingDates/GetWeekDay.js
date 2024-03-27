
/*
WD - weekday
This function returns weekday of specified date

Input:
date(dd.mm.yyyy)

Output:
weekday - number from 0 to 6
*/

export default function (date) {
  const dateArray = date.split('.')
  const unixTime = new Date(
    parseInt(dateArray[2]), 
    parseInt(dateArray[1] - 1), 
    parseInt(dateArray[0]))
  return unixTime.getDay()-1
}