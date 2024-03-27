
/*
Get Date Proximity
This function returns the proximity of the date as a number

Input:
date(dd.mm.yyyy)

Output:
proximity of the date as a number
*/

export default function (date) {
  const dateArray = date.split('.')
  const dateNow = new Date()
  const unixTime1 = new Date(
    parseInt(dateArray[2]), 
    parseInt(dateArray[1] - 1), 
    parseInt(dateArray[0]))
  const unixTime2 = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate())
  return unixTime1.getTime() - unixTime2.getTime()
}