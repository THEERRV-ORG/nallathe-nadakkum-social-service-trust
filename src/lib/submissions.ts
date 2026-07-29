import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  type DocumentData,
  type QueryDocumentSnapshot,
} from 'firebase/firestore';
import { requireFirestore } from './firebase';

export type SubmissionCollection =
  | 'assistanceRequests'
  | 'volunteerApplications'
  | 'speakerInvitations'
  | 'contactMessages'
  | 'donationPledges';

export type SubmissionRecord = {
  id: string;
  createdAtText: string;
  data: Record<string, unknown>;
};

function formatCreatedAt(doc: QueryDocumentSnapshot<DocumentData>) {
  const value = doc.data().createdAt;
  const date = value && typeof value.toDate === 'function' ? value.toDate() as Date : null;
  return date ? date.toLocaleDateString('en-IN') : '';
}

export async function saveSubmission(collectionName: SubmissionCollection, data: Record<string, unknown>) {
  const firestore = requireFirestore();
  return addDoc(collection(firestore, collectionName), {
    ...data,
    source: 'website',
    createdAt: serverTimestamp(),
  });
}

export function listenToSubmissions(
  collectionName: SubmissionCollection,
  onRows: (rows: SubmissionRecord[]) => void,
  onError: (error: Error) => void,
) {
  const firestore = requireFirestore();
  const submissionsQuery = query(collection(firestore, collectionName), orderBy('createdAt', 'desc'));

  return onSnapshot(
    submissionsQuery,
    (snapshot) => {
      onRows(snapshot.docs.map((doc) => ({
        id: doc.id,
        createdAtText: formatCreatedAt(doc),
        data: doc.data(),
      })));
    },
    onError,
  );
}
