import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";
import type { DiaryEntry } from "../types/diary";

const diaryCollection = (uid: string) =>
  collection(db, "users", uid, "diaries");

export const createDiary = async (
  uid: string,
  entry: Omit<DiaryEntry, "id">
) => {
  const col = diaryCollection(uid);
  await addDoc(col, entry);
};

export const fetchDiaries = async (uid: string): Promise<DiaryEntry[]> => {
  const q = query(diaryCollection(uid), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...(docSnap.data() as Omit<DiaryEntry, "id">),
  }));
};

export const updateDiary = async (
  uid: string,
  diaryId: string,
  data: Partial<Omit<DiaryEntry, "id">>
) => {
  await updateDoc(doc(db, "users", uid, "diaries", diaryId), data);
};

export const deleteDiary = async (uid: string, diaryId: string) => {
  await deleteDoc(doc(db, "users", uid, "diaries", diaryId));
};
