/*
Load data
This function gets and handles necessary data from database and asyncstorage
It runs onn the splash screen

Output:
data({'homework': ..., etc.})
*/

import { initializeApp } from "firebase/app";
import firebaseConfig from "../../../keys/firebase.json";
import get from "../../hooks/firebase/get";
// import logEvent from "../firebase/logEvent";
// import { getAnalytics, logEvent } from "firebase/analytics";
// import analytics from "@react-native-firebase/analytics";

const db = initializeApp(firebaseConfig);

// Comparators
import CompareDatesApprouch from "../handlingDates/CompareApprouch";
import CompareDates from "../handlingDates/Compare";

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
  data["devMode"] = {
    code: data.devMode.pinCode,
    active: false,
    currentVersion: data.devMode.currentVersion,
  };

  return data;
}
