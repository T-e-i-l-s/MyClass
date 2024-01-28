import { getFirestore, doc, getDoc } from 'firebase/firestore/lite';

export default async function get(database, collection, document) {
  return new Promise(async (resolve, reject) => {
    const app = getFirestore(database)
    let docRef = doc(app, collection, document)
    let docSnap = await getDoc(docRef)
    let result = docSnap.data()
    resolve(result)
  })
}