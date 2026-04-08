import {
  doc,
  getDoc,
  setDoc,
  addDoc,
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  serverTimestamp,
  updateDoc,
  increment,
} from "firebase/firestore";
import { db } from "../firebase";

// ─────────────────────────────────────────────────────────
// USERS
// ─────────────────────────────────────────────────────────

// Create or fetch user doc on first visit
export async function initUserDoc(uid, { generation, birthYear, dob }) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      uid,
      generation,
      birthYear,
      dob,
      tier: "free", // 'free' | 'premium'
      theme: "navy", // active colour theme
      cardDeck: "nautical", // active card deck theme
      shuffleStyle: "fan", // 'fan' | 'riffle' | 'arc'
      preferences: {}, // tag → score map
      dominantMood: null,
      createdAt: serverTimestamp(),
      lastSeen: serverTimestamp(),
    });
  } else {
    // update lastSeen on every visit
    await updateDoc(ref, { lastSeen: serverTimestamp() });
  }

  return (await getDoc(ref)).data();
}

// Update a single user preference field
export async function updateUserPref(uid, field, value) {
  const ref = doc(db, "users", uid);
  await updateDoc(ref, { [field]: value });
}

// Update tag preference scores based on interaction
// action: 'answered' | 'skipped' | 'shared'
export async function updateTagScores(uid, tags = [], action) {
  if (!tags.length) return;
  const delta = action === "answered" ? 2 : action === "shared" ? 3 : -1;
  const ref = doc(db, "users", uid);
  const updates = {};
  tags.forEach((tag) => {
    updates[`preferences.${tag}`] = increment(delta);
  });
  await updateDoc(ref, updates);
}

// ─────────────────────────────────────────────────────────
// RESPONSES
// ─────────────────────────────────────────────────────────

// Save a user's response to a card
export async function saveResponse({
  uid,
  cardId,
  cardCategory,
  cardTags,
  answerText,
  mood,
  isShared = false,
  generation,
  ageAtEntry,
}) {
  const ref = await addDoc(collection(db, "responses"), {
    uid,
    cardId,
    cardCategory,
    cardTags,
    answerText,
    mood,
    isShared,
    generation,
    ageAtEntry,
    createdAt: serverTimestamp(),
  });

  // if sharing, mirror to sharedResponses
  if (isShared && answerText.trim()) {
    await addDoc(collection(db, "sharedResponses"), {
      cardId,
      cardCategory,
      cardTags,
      answerText,
      mood,
      generation,
      ageAtEntry,
      createdAt: serverTimestamp(),
    });
  }

  return ref.id;
}

// Get all responses for a user
export async function getUserResponses(uid) {
  const q = query(
    collection(db, "responses"),
    where("uid", "==", uid),
    orderBy("createdAt", "desc"),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Get a user's response to a specific card (if any)
export async function getResponseForCard(uid, cardId) {
  const q = query(
    collection(db, "responses"),
    where("uid", "==", uid),
    where("cardId", "==", cardId),
    limit(1),
  );
  const snap = await getDocs(q);
  return snap.empty ? null : { id: snap.docs[0].id, ...snap.docs[0].data() };
}

// Get responses for memory resurfacing
// Returns responses older than 30 days that haven't been resurfaced
export async function getMemoryCard(uid) {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const q = query(
    collection(db, "responses"),
    where("uid", "==", uid),
    where("answerText", "!=", ""),
    orderBy("answerText"),
    orderBy("createdAt", "asc"),
    limit(1),
  );
  const snap = await getDocs(q);
  return snap.empty ? null : { id: snap.docs[0].id, ...snap.docs[0].data() };
}

// ─────────────────────────────────────────────────────────
// SHARED RESPONSES (anonymous social)
// ─────────────────────────────────────────────────────────

// Get anonymous responses for a card from same generation
export async function getSharedResponses(cardId, generation, limitCount = 3) {
  const q = query(
    collection(db, "sharedResponses"),
    where("cardId", "==", cardId),
    where("generation", "==", generation),
    orderBy("createdAt", "desc"),
    limit(limitCount),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// ─────────────────────────────────────────────────────────
// CARD SELECTION ALGORITHM
// ─────────────────────────────────────────────────────────

// Given user preferences and seen card IDs,
// returns ordered card IDs using 70/20/10 mix
export function selectCards(allCards, preferences = {}, seenIds = []) {
  const unseen = allCards.filter((c) => !seenIds.includes(c.id));
  const seen = allCards.filter((c) => seenIds.includes(c.id));

  // score each unseen card by preference tags
  const scored = unseen.map((card) => {
    const score = (card.tags || []).reduce((acc, tag) => {
      return acc + (preferences[tag] || 0);
    }, 0);
    return { ...card, _score: score };
  });

  scored.sort((a, b) => b._score - a._score);

  const total = allCards.length;
  const n70 = Math.max(1, Math.floor(total * 0.7));
  const n20 = Math.max(1, Math.floor(total * 0.2));
  const n10 = Math.max(1, total - n70 - n20);

  const relevant = scored.slice(0, n70);
  const random = shuffle([...scored.slice(n70)]).slice(0, n20);
  const resurface = shuffle([...seen]).slice(0, n10);

  return [...relevant, ...random, ...resurface];
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
