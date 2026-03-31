import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES } from "../data/cards";

const CATEGORY_COLORS = {
  TIME: "#d4af37",
  BIOLOGY: "#60c060",
  ASTRONOMY: "#6090e0",
  PSYCHOLOGY: "#c060c0",
  PERSPECTIVE: "#e08040",
  IDENTITY: "#60c0c0",
};

export default function FlipCard({ card, index, total, onNext, onPrev }) {
  const [flipped, setFlipped] = useState(false);
  const cat = CATEGORIES[card.category];
  const color = CATEGORY_COLORS[card.category];
  const isPremium = card.tier === "premium";

  const handleFlip = () => setFlipped((f) => !f);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "420px",
        margin: "0 auto",
      }}
    >
      {/* ── DECK SHADOW CARDS BEHIND ── */}
      {[2, 1].map((offset) => (
        <div
          key={offset}
          style={{
            position: "absolute",
            top: offset * 10,
            left: offset * 6,
            right: -offset * 6,
            height: "520px",
            borderRadius: "20px",
            background: "var(--card-bg)",
            border: "1px solid var(--border)",
            opacity: 0.4 - offset * 0.1,
            transform: `rotate(${offset * 1.5}deg)`,
            zIndex: -offset,
          }}
        />
      ))}

      {/* ── MAIN CARD ── */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        style={{ height: "520px", position: "relative", zIndex: 1 }}
      >
        <div className="card-scene">
          <div className={`card-inner ${flipped ? "flipped" : ""}`}>
            {/* ── FRONT FACE ── */}
            <div
              className="card-face"
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--border)",
              }}
            >
              {/* top accent line */}
              <div
                style={{
                  height: "3px",
                  background: `linear-gradient(to right, ${color}, transparent)`,
                  borderRadius: "20px 20px 0 0",
                }}
              />

              {/* premium lock overlay */}
              {isPremium && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 10,
                    background: "rgba(10,8,15,0.85)",
                    backdropFilter: "blur(8px)",
                    borderRadius: "20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "12px",
                  }}
                >
                  <div style={{ fontSize: "36px" }}>🔒</div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "22px",
                      color: "var(--accent)",
                      letterSpacing: "1px",
                    }}
                  >
                    Premium Card
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "13px",
                      color: "var(--text2)",
                      textAlign: "center",
                      maxWidth: "220px",
                      lineHeight: 1.6,
                    }}
                  >
                    Unlock deeper insights with howOld Premium
                  </div>
                  <button
                    style={{
                      marginTop: "8px",
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      letterSpacing: "2px",
                      background: "transparent",
                      color: "var(--accent)",
                      border: "1px solid var(--accent)",
                      padding: "10px 24px",
                      borderRadius: "4px",
                    }}
                  >
                    UNLOCK — coming soon
                  </button>
                </div>
              )}

              <div
                style={{
                  padding: "32px 28px 24px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* category badge */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "32px",
                  }}
                >
                  <span style={{ fontSize: "16px" }}>{cat.icon}</span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      letterSpacing: "3px",
                      color,
                      textTransform: "uppercase",
                    }}
                  >
                    {cat.label}
                  </span>
                  <div
                    style={{
                      marginLeft: "auto",
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      color: "var(--text3)",
                      letterSpacing: "1px",
                    }}
                  >
                    {index + 1} / {total}
                  </div>
                </div>

                {/* eyebrow */}
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "13px",
                    color: "var(--text2)",
                    letterSpacing: "0.5px",
                    marginBottom: "12px",
                    fontWeight: 300,
                  }}
                >
                  {card.front.eyebrow}
                </div>

                {/* headline number */}
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: card.front.headline.length > 12 ? "42px" : "64px",
                    fontWeight: 300,
                    lineHeight: 1,
                    color: "var(--text)",
                    letterSpacing: "-1px",
                    marginBottom: "8px",
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {card.front.headline}
                </div>

                {/* sub */}
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "18px",
                    color,
                    fontWeight: 400,
                    marginBottom: "8px",
                  }}
                >
                  {card.front.sub}
                </div>

                {/* detail */}
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    color: "var(--text3)",
                    letterSpacing: "0.5px",
                    marginBottom: "32px",
                    lineHeight: 1.6,
                  }}
                >
                  {card.front.detail}
                </div>

                {/* flip hint */}
                <button
                  onClick={handleFlip}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "transparent",
                    border: "none",
                    color: "var(--text3)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    letterSpacing: "2px",
                    paddingBottom: "4px",
                    borderBottom: "1px solid var(--border)",
                    alignSelf: "flex-start",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--accent)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--text3)")
                  }
                >
                  <span style={{ fontSize: "12px" }}>↻</span>
                  FLIP FOR MEANING
                </button>
              </div>
            </div>

            {/* ── BACK FACE ── */}
            <div
              className="card-face card-back-face"
              style={{
                background: "var(--card-back)",
                border: `1px solid ${color}33`,
              }}
            >
              {/* top accent */}
              <div
                style={{
                  height: "3px",
                  background: `linear-gradient(to right, ${color}, transparent)`,
                  borderRadius: "20px 20px 0 0",
                }}
              />

              <div
                style={{
                  padding: "32px 28px 24px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* category badge */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "28px",
                  }}
                >
                  <span style={{ fontSize: "16px" }}>{cat.icon}</span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      letterSpacing: "3px",
                      color,
                      textTransform: "uppercase",
                    }}
                  >
                    {cat.label}
                  </span>
                </div>

                {/* back headline */}
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "24px",
                    fontWeight: 600,
                    lineHeight: 1.3,
                    color: "var(--text)",
                    marginBottom: "20px",
                    fontStyle: "italic",
                  }}
                >
                  {card.back.headline}
                </div>

                {/* body text */}
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "14px",
                    color: "var(--text2)",
                    lineHeight: 1.8,
                    flex: 1,
                    overflow: "auto",
                  }}
                >
                  {card.back.body}
                </div>

                {/* quote */}
                <div
                  style={{
                    marginTop: "20px",
                    paddingTop: "16px",
                    borderTop: `1px solid ${color}22`,
                    fontFamily: "var(--font-display)",
                    fontSize: "13px",
                    fontStyle: "italic",
                    color: "var(--text3)",
                    lineHeight: 1.6,
                  }}
                >
                  {card.back.quote}
                </div>

                {/* flip back */}
                <button
                  onClick={handleFlip}
                  style={{
                    marginTop: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "transparent",
                    border: "none",
                    color: "var(--text3)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    letterSpacing: "2px",
                    paddingBottom: "4px",
                    borderBottom: "1px solid var(--border)",
                    alignSelf: "flex-start",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--accent)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--text3)")
                  }
                >
                  <span style={{ fontSize: "12px" }}>↻</span>
                  FLIP BACK
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── NAV ARROWS ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "28px",
        }}
      >
        <button
          onClick={() => {
            setFlipped(false);
            onPrev();
          }}
          disabled={index === 0}
          style={{
            background: "transparent",
            border: "1px solid var(--border)",
            color: index === 0 ? "var(--text3)" : "var(--text2)",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "2px",
            padding: "10px 20px",
            borderRadius: "4px",
            opacity: index === 0 ? 0.3 : 1,
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            if (index > 0) {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.color = "var(--accent)";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.color = "var(--text2)";
          }}
        >
          ← PREV
        </button>

        {/* progress dots */}
        <div style={{ display: "flex", gap: "6px" }}>
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              style={{
                width: i === index ? "20px" : "6px",
                height: "6px",
                borderRadius: "3px",
                background: i === index ? "var(--accent)" : "var(--border)",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>

        <button
          onClick={() => {
            setFlipped(false);
            onNext();
          }}
          disabled={index === total - 1}
          style={{
            background: index === total - 1 ? "transparent" : "var(--accent)",
            border: "1px solid var(--accent)",
            color: index === total - 1 ? "var(--text3)" : "var(--bg)",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "2px",
            padding: "10px 20px",
            borderRadius: "4px",
            opacity: index === total - 1 ? 0.3 : 1,
            transition: "all 0.2s ease",
          }}
        >
          NEXT →
        </button>
      </div>
    </div>
  );
}
