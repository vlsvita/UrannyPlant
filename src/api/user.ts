import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import type { UserData } from "../types/user";

export const getUserData = async (userId: string): Promise<UserData | null> => {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      return userDocSnap.data() as UserData;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
