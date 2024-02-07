
import { initializeApp } from "firebase/app";
import firebaseConfig from '../keys/firebase.json'
import get from '../firebase/get'

const db = initializeApp(firebaseConfig)

// Comparators
import CDA from './CDA'
import CD from './CD'

export default async function () {

  let data = {}

  data["homework"] = await get(db, "MyClass", "Homework")
  data["homework"].tasks = (data["homework"].tasks).sort(CD)

  data["schedule"] = await get(db, "MyClass", "Timetable")

  data["onboarding"] = await get(db, "MyClass", "Onboarding")

  data["holidays"] = await get(db, "MyClass", "Holidays")
  data["holidays"].dates = (data["holidays"].dates).sort(CDA)

  data["devMode"] = await get(db, "MyClass", "DevMode")
  data["devMode"] = {code: data.devMode.pinCode, active: false}

  return data
}