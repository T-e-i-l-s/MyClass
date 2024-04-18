/*
Date to string
This function handles the date and returns this date
as a suitable string(weekday or something else)

Input:
date(dd.mm.yyyy)

Output:
date as a suitable string
*/

import GetProximity from "./GetProximity";
import GetWeekday from "./GetWeekDay";

const days1 = [
  "понедельник",
  "вторник",
  "среду",
  "четверг",
  "пятницу",
  "субботу",
]; // Винительный падеж
const days2 = [
  "понедельник",
  "вторник",
  "среда",
  "четверг",
  "пятница",
  "суббота",
]; // Именительный падеж

export default function (date) {
  let dif = GetProximity(date) / 1000;
  // console.log(date + " " + dif)
  if (dif < -1 * 60 * 60 * 24) {
    return date;
  } else if (dif < 0) {
    return "вчера";
  } else if (dif == 0) {
    return "сегодня";
  } else if (dif <= 60 * 60 * 24) {
    return "завтра";
  } else if (dif < 60 * 60 * 24 * 7) {
    return days1[GetWeekday(date)];
  } else {
    return date + " (" + days2[GetWeekday(date)] + ")";
  }
}
