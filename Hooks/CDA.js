
/*
CDA - Compare Dates Approach
This function working as comparator for two dates
It compares proximity of the dates with today
*/

/*
Input:
1) First linked list of objects {day: [your day], month: [your month]}
2) Second linked list of objects {day: [your day], month: [your month]}
*/

/*
Output:
-1, 0, 1 like simple comparator
*/

export default function (date1, date2) {

  const timeNow = new Date()

  const arrayOfDates1 = [parseInt(date1.day), parseInt(date1.month)]
  const arrayOfDates2 = [parseInt(date2.day), parseInt(date2.month)]

  let unixTime1 = new Date(timeNow.getFullYear(), arrayOfDates1[1]-1, arrayOfDates1[0])
  let unixTime2 = new Date(timeNow.getFullYear(), arrayOfDates2[1]-1, arrayOfDates2[0])

  /*
  Checking for past date
  We must compare only future or present dates.
  So when we spot that one of dates has passed, 
  we must use this day and month, but of the next year.
  */

  if (unixTime1 < timeNow) {
    unixTime1 = new Date(timeNow.getFullYear()+1, arrayOfDates1[1]-1, arrayOfDates1[0])
  }
  if (unixTime2 < timeNow) {
    unixTime2 = new Date(timeNow.getFullYear()+1, arrayOfDates2[1]-1, arrayOfDates2[0])
  }

  let dif1 = unixTime1-timeNow
  let dif2 = unixTime2-timeNow

  if (dif1 > dif2 || dif1 == 'Invalid Date' || dif2 == 'Date') {
    return 1
  } else if (dif1 == dif2) {
    return 0
  } else {
    return -1
  }
  
}