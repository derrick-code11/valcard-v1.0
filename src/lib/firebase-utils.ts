import {
  collection,
  doc,
  getDoc,
  setDoc,
  getDocs,
  deleteDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import { nanoid } from "nanoid";

interface CardData {
  templateId: string;
  generatedCard: string;
  createdAt: any;
  userId?: string;
  userName?: string;
  isPublic: boolean;
}

export async function saveCard(data: Omit<CardData, "createdAt">) {
  try {
    const shareId = nanoid(10); // Generate a shorter, readable ID
    const cardRef = doc(db, "cards", shareId);
    await setDoc(cardRef, {
      ...data,
      createdAt: serverTimestamp(),
    });
    return { shareId, error: null };
  } catch (error) {
    console.error("Error saving card:", error);
    return { shareId: null, error: "Failed to save card" };
  }
}

export async function getCard(shareId: string): Promise<CardData | null> {
  try {
    const cardRef = doc(db, "cards", shareId);
    const cardSnap = await getDoc(cardRef);

    if (cardSnap.exists()) {
      return cardSnap.data() as CardData;
    }
    return null;
  } catch (error) {
    console.error("Error getting card:", error);
    return null;
  }
}

export async function getUserCards(userId: string) {
  try {
    const cardsRef = collection(db, "cards");
    const q = query(cardsRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    const cards = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return { cards, error: null };
  } catch (error) {
    console.error("Error getting user cards:", error);
    return { cards: [], error: "Failed to fetch cards" };
  }
}

export async function deleteCard(cardId: string, userId: string) {
  try {
    const cardRef = doc(db, "cards", cardId);
    const cardSnap = await getDoc(cardRef);

    if (!cardSnap.exists()) {
      return { error: "Card not found" };
    }

    const cardData = cardSnap.data();
    if (cardData.userId !== userId) {
      return { error: "Unauthorized" };
    }

    await deleteDoc(cardRef);
    return { error: null };
  } catch (error) {
    console.error("Error deleting card:", error);
    return { error: "Failed to delete card" };
  }
}

export async function updateCardVisibility(
  cardId: string,
  userId: string,
  isPublic: boolean
) {
  try {
    const cardRef = doc(db, "cards", cardId);
    const cardSnap = await getDoc(cardRef);

    if (!cardSnap.exists()) {
      return { error: "Card not found" };
    }

    const cardData = cardSnap.data();
    if (cardData.userId !== userId) {
      return { error: "Unauthorized" };
    }

    await setDoc(cardRef, { isPublic }, { merge: true });
    return { error: null };
  } catch (error) {
    console.error("Error updating card visibility:", error);
    return { error: "Failed to update card visibility" };
  }
}
