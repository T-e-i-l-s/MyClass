/*
Get current weekday
This function returns current weekday name

Input:
-

Output:
weekday - string
*/

const weekdays = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];

export default function () {
  const date = new Date();
  return weekdays[date.getDay()];
}
