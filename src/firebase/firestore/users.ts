
import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from '@/firebase/config';

/**
 * Updates the 'hasUsedFreeGeneration' field for a user in Firestore.
 * @param uid The user's ID.
 * @param hasUsed The new value for 'hasUsedFreeGeneration'.
 */
export const updateUserFreeGeneration = async (uid: string, hasUsed: boolean): Promise<void> => {
  if (!uid) {
    console.error("UID is missing, can't update free generation status.");
    return;
  }
  const userDocRef = doc(firestore, 'users', uid);
  try {
    await updateDoc(userDocRef, {
      hasUsedFreeGeneration: hasUsed,
    });
  } catch (error) {
    console.error('Error updating user free generation status:', error);
    throw new Error('Failed to update user status.');
  }
};
