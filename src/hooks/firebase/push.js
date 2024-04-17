import { getFirestore, doc, updateDoc } from 'firebase/firestore/lite';

export default async function get(database, collection, document, key, value ) {
  const app = getFirestore(database)
  let docRef = doc(app, collection, document)
  updateDoc(docRef, {
    [key]: value
  });
}