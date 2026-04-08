import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CATEGORIES } from "../data/cards";
import { CARD_DECKS } from "../data/cardDecks";
import {
  saveResponse,
  getResponseForCard,
  updateTagScores,
} from "../services/firestore";

const SHUFFLE_VARIANTS = {
  fan: {
    enter: { opacity: 0, y: 30, rotate: -12, scale: 0.9 },
    center: { opacity: 1, y: 0, rotate: 0, scale: 1 },
    exit: { opacity: 0, y: -30, rotate: 12, scale: 0.9 },
    transition: { type: "spring", stiffness: 260, damping: 22 },
  },
};

const MOODS = [
  { id: "reflective", label: "Reflective" },
  { id: "nostalgic", label: "Nostalgic" },
  { id: "hopeful", label: "Hopeful" },
  { id: "anxious", label: "Anxious" },
  { id: "grateful", label: "Grateful" },
];

export default function FlipCard({
  card,
  index,
  total,
  onNext,
  onPrev,
  shuffleStyle = "fan",
  deckThemeId = "nautical",
  user,
  age,
}) {
  if (!card) return null;

  const [flipped, setFlipped] = useState(false);
  const [response, setResponse] = useState("");
  const [mood, setMood] = useState(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [existingResp, setExistingResp] = useState(null);
  const [showInput, setShowInput] = useState(false);

  const cat = CATEGORIES[card.category] || { icon: "•", label: "UNKNOWN" };
  const deck = CARD_DECKS.find((d) => d.id === deckThemeId) || CARD_DECKS[0];
  const vars = SHUFFLE_VARIANTS[shuffleStyle] || SHUFFLE_VARIANTS.fan;

  const headline = card?.front?.headline || "";

  useEffect(() => {
    let active = true;

    setFlipped(false);
    setResponse("");
    setMood(null);
    setSaved(false);
    setShowInput(false);
    setExistingResp(null);

    if (user && card.id) {
      getResponseForCard(user.uid, card.id).then((r) => {
        if (active && r) {
          setExistingResp(r);
          setSaved(true);
        }
      });
    }

    return () => {
      active = false;
    };
  }, [card.id, user?.uid]);

  const handleSave = async () => {
    if (!user || !response.trim()) return;

    setSaving(true);

    try {
      await saveResponse({
        uid: user.uid,
        cardId: card.id,
        cardCategory: card.category,
        cardTags: card.tags || [],
        answerText: response.trim(),
        mood,
        isShared: false,
        generation: age?.generation || "",
        ageAtEntry: age?.years || 0,
      });

      await updateTagScores(user.uid, card.tags || [], "answered");

      setSaved(true);

      setTimeout(() => {
        onNext();
      }, 600);
    } catch (e) {
      console.error(e);
    }

    setSaving(false);
  };

  const goNext = () => {
    if (!saving) {
      setFlipped(false);
      onNext();
    }
  };

  const faceStyle = {
    backdropFilter: "blur(28px)",
    background: "var(--glass-bg)",
    borderRadius: "20px",
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <motion.div
        initial={vars.enter}
        animate={vars.center}
        exit={vars.exit}
        transition={vars.transition}
        style={{ height: "540px" }}
      >
        <div className="card-scene">
          <div className={`card-inner ${flipped ? "flipped" : ""}`}>
            {/* FRONT */}
            <div className="card-face" style={faceStyle}>
              <div
                style={{
                  padding: "24px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ marginBottom: "20px" }}>
                  {cat.icon} {cat.label} — {index + 1}/{total}
                </div>

                <div
                  style={{
                    fontSize: headline.length > 14 ? "32px" : "48px",
                    flex: 1,
                  }}
                >
                  {headline}
                </div>

                <button onClick={() => setFlipped(true)}>REFLECT</button>
              </div>
            </div>

            {/* BACK */}
            <div className="card-face card-back-face" style={faceStyle}>
              <div
                style={{
                  padding: "24px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div>{card?.back?.body}</div>

                <div style={{ marginTop: "auto" }}>
                  {saved ? (
                    <div>
                      <div>Saved ✔</div>
                      <button onClick={goNext} disabled={saving}>
                        NEXT →
                      </button>
                    </div>
                  ) : showInput ? (
                    <>
                      <textarea
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                        placeholder="What comes up for you?"
                      />

                      <div>
                        {MOODS.map((m) => (
                          <button key={m.id} onClick={() => setMood(m.id)}>
                            {m.label}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={handleSave}
                        disabled={saving || !response.trim()}
                      >
                        {saving ? "Saving..." : "Save"}
                      </button>

                      <button onClick={goNext}>Skip</button>
                    </>
                  ) : (
                    <button onClick={() => setShowInput(true)}>
                      Write Reflection
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* NAV */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <button
          onClick={() => {
            setFlipped(false);
            onPrev();
          }}
          disabled={index === 0}
        >
          ← PREV
        </button>

        <button onClick={goNext} disabled={index === total - 1 || saving}>
          NEXT →
        </button>
      </div>
    </div>
  );
}
