import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/analytics";

export const firebaseConfig = {
  apiKey: "AIzaSyBP3MDb5upM0oEEHnCKp5GYX0OUowkbvQE",
  authDomain: "kadzama3dprinter.firebaseapp.com",
  projectId: "kadzama3dprinter",
  storageBucket: "kadzama3dprinter.appspot.com",
  messagingSenderId: "957194061920",
  appId: "1:957194061920:web:463d3b0992b64378139b05",
  measurementId: "G-X5N8W274ZC",
};

export const storageUserFolder = "user";
export const firestoreUserDrawingCollection = "user-drawing";
export const firestoreModelsCollectionPath = "storage/model-library/public";
export const firestoreTagsCollectionPath = "storage/model-library/tags";
export const userDrawingGcodeFilename = "drawing.gcode";

export const firestoreAutoId = () => {
  const CHARS =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let autoId = "";

  for (let i = 0; i < 20; i++) {
    autoId += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  }
  return autoId;
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export const analytics = firebase.analytics();

export const firestoreUserDrawingDocument = (uid) => {
  return db.collection(firestoreUserDrawingCollection).doc(uid);
};

export const firestoreModelsCollection = () => {
  return db.collection(firestoreModelsCollectionPath);
};

export const firestoreTagsCollection = () => {
  return db.collection(firestoreTagsCollectionPath);
};

export const retrieveCachedCollection = async (collection) => {
  try {
    const now = Date.now();
    const storageKey = collection.path;
    const itemsJson = localStorage.getItem(storageKey);
    const itemsWithTTL = itemsJson ? JSON.parse(itemsJson) : null;
    const ttl = itemsWithTTL ? itemsWithTTL["ttl"] : null;
    let items = itemsWithTTL ? itemsWithTTL["items"] : null;

    if (!ttl || now > ttl) {
      items = null;
    }

    if (!items) {
      items = [];
      // const invalidateAt = now + 5 * 60 * 1000; // 5 minutes
      const invalidateAt = now + 1000; // 5 minutes
      const models_data = await collection.get();
      models_data.docs.forEach((item) => {
        items = [...items, { ...item.data(), id: item.id }];
      });
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          items: items,
          ttl: invalidateAt,
        })
      );
    }
    return items;
  } catch (e) {
    console.log(e);
  }
};

export const storageUserDrawingGcodeRef = (uid) => {
  return storage
    .ref(storageUserFolder)
    .child(uid)
    .child(userDrawingGcodeFilename);
};
