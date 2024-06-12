import { db } from '@/lib/firebaseClient';
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  getDocs,
  onSnapshot,
  query,
  where,
  Timestamp,
} from 'firebase/firestore';

export async function uploadDubplate(data) {
  const dubplate = collection(db, 'dubplates');
  try {
    const docRef = await addDoc(dubplate, data);
  } catch (error) {
    console.error('error uploading: ', error);
  }
}

export async function fetchDubplates() {
  const snapshot = await getDocs(collection(db, 'dubplates'));

  const dubplates = [];
  snapshot.forEach((doc) => {
    dubplates.push(doc.data());
  });

  return dubplates;
}

export async function addWalletToUpload(id, address) {
  const uploadRef = doc(db, 'uploads', id);

  try {
    await updateDoc(uploadRef, { address: address });
  } catch (error) {
    console.error('error uploading: ', error);
  }
}

export function listenForNewDownload(cb, ip) {
  const downloadsQuery = query(
    collection(db, 'uploads'),
    where('download', '==', true),
    where('timestamp', '>=', Timestamp.now().toMillis())
  );

  const listener = onSnapshot(downloadsQuery, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added' && change.doc.data().ip == ip) {
        console.log('new download: ', change.doc.data().name, change.doc.id);
        cb(change.doc.data().hash, change.doc.data().name);
      }
    });
  });

  return listener;
}

export function listenForNewUpload(cb, ip) {
  const uploadsQuery = query(
    collection(db, 'uploads'),
    where('download', '==', false),
    where('timestamp', '>=', Timestamp.now().toMillis())
  );

  const listener = onSnapshot(uploadsQuery, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added' && change.doc.data().ip == ip) {
        console.log('new upload: ', change.doc.data().name, change.doc.id);
        cb(change.doc.data().hash, change.doc.data().name, change.doc.id);
      }
    });
  });

  return listener;
}

export function listenForRecordOn(cb, ip) {
  const uploadsQuery = query(collection(db, 'sessions'), where('ip', '==', ip));

  const listener = onSnapshot(uploadsQuery, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'modified' && change.doc.data().recording == true) {
        cb();
      }
    });
  });

  return listener;
}

export function listenForRecordOff(cb, ip) {
  const uploadsQuery = query(collection(db, 'sessions'), where('ip', '==', ip));

  const listener = onSnapshot(uploadsQuery, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'modified' && change.doc.data().recording == false) {
        cb();
      }
    });
  });

  return listener;
}
