/*
Load data
This function gets and handles necessary data from database and asyncstorage
It runs onn the splash screen

Output:
data({'homework': ..., etc.})
*/

import { initializeApp } from "firebase/app";
import firebaseConfig from "../../keys/firebase.json";
import get from "../../firebase/get";

const db = initializeApp(firebaseConfig);

// Comparators
import CompareDatesApprouch from "../HandlingDates/CompareApprouch";
import CompareDates from "../HandlingDates/Compare";

export default async function () {
  let data = {};

  data["homework"] = await get(db, "MyClass", "Homework");
  data["homework"].tasks = data["homework"].tasks.sort(CompareDates);

  data["schedule"] = await get(db, "MyClass", "Timetable");

  data["onboarding"] = await get(db, "MyClass", "Onboarding");

  data["holidays"] = await get(db, "MyClass", "Holidays");
  data["holidays"].dates = data["holidays"].dates.sort(CompareDatesApprouch);

  data["students"] = await get(db, "MyClass", "Students");

  data["lessons"] = await get(db, "MyClass", "Lessons");

  data["devMode"] = await get(db, "MyClass", "DevMode");
  data["devMode"] = { code: data.devMode.pinCode, active: false };

  return data;
}
