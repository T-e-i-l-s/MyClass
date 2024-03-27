
/*
CD - Compare Dates
This function working as comparator for two dates
It compares unixTime of the dates

Input:
1) First linked list of objects {date: [string]}
2) Second linked list of objects {date: [string]}

Output:
-1, 0, 1 like simple comparator
*/

export default function (object1, object2) {

  const date1 = object1.date
  const date2 = object2.date

  const dateArray1 = date1.split('.')
  const dateArray2 = date2.split('.')

  const unixTime1 = new Date(
    parseInt(dateArray1[2]), 
    parseInt(dateArray1[1] - 1), 
    parseInt(dateArray1[0]))
  const unixTime2 = new Date(
    parseInt(dateArray2[2]), 
    parseInt(dateArray2[1] - 1), 
    parseInt(dateArray2[0]))

  if (unixTime1 > unixTime2 || unixTime1 == 'Invalid Date' || unixTime2 == 'Date') {
    return -1
  } else if (unixTime1 == unixTime2) {
    return 0
  } else {
    return 1
  }

}