import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Zone01Identify({ onDateSet, savedDob }) {
  const [dd, setDd] = useState("");
  const [mm, setMm] = useState("");
  const [yyyy, setYyyy] = useState("");
  const [locked, setLocked] = useState(!!savedDob);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (dd.length < 2 || mm.length < 2 || yyyy.length < 4) {
      setError("Please enter a complete date.");
      return;
    }
    const iso = `${yyyy}-${mm}-${dd}`;
    const date = new Date(iso);
    if (isNaN(date.getTime()) || date > new Date()) {
      setError("Please enter a valid past date.");
      return;
    }
    setError("");
    setLocked(true);
    onDateSet(iso);
  };

  const inputStyle = {
    background: "transparent",
    border: "none",
    borderBottom: "1px solid var(--border)",
    color: "var(--text)",
    fontFamily: "var(--font-display)",
    fontSize: "52px",
    fontWeight: 300,
    width: "100%",
    textAlign: "center",
    outline: "none",
    padding: "4px 0",
    caretColor: "var(--accent)",
    letterSpacing: "2px",
    transition: "border-color 0.3s ease",
  };

  return (
    <div
      data-zone="01"
      style={{
        height: "100vh",
        scrollSnapAlign: "start",
        scrollSnapStop: "always",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 30% 30%, var(--bg3) 0%, var(--bg) 60%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "var(--glow)",
          filter: "blur(80px)",
          opacity: 0.3,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          right: "10%",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "var(--glow)",
          filter: "blur(60px)",
          opacity: 0.2,
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          position: "absolute",
          top: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          letterSpacing: "6px",
          color: "var(--text3)",
          textTransform: "uppercase",
        }}
      >
        howOld v3.0
      </motion.div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "480px",
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(52px, 12vw, 96px)",
              fontWeight: 300,
              lineHeight: 0.9,
              color: "var(--text)",
              letterSpacing: "-2px",
              marginBottom: "8px",
            }}
          >
            how
            <span style={{ color: "var(--accent)", fontStyle: "italic" }}>
              Old
            </span>
          </div>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "15px",
              color: "var(--text2)",
              fontWeight: 300,
              letterSpacing: "0.5px",
              marginBottom: "48px",
            }}
          >
            Your birthdate, decoded.
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {!locked ? (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                background: "var(--glass-bg)",
                border: "1px solid var(--glass-border)",
                borderRadius: "16px",
                padding: "32px 28px",
                boxShadow:
                  "0 16px 48px rgba(0,0,0,0.35), inset 0 1px 0 var(--glass-shine)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "flex-end",
                  marginBottom: "28px",
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "9px",
                      letterSpacing: "3px",
                      color: "var(--text3)",
                      marginBottom: "8px",
                    }}
                  >
                    DAY
                  </div>
                  <input
                    value={dd}
                    maxLength={2}
                    inputMode="numeric"
                    placeholder="DD"
                    autoFocus
                    style={inputStyle}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "var(--accent)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "var(--border)")
                    }
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, "");
                      setDd(v);
                      if (v.length === 2)
                        document.getElementById("mm-input")?.focus();
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  />
                </div>
                <div
                  style={{
                    color: "var(--text3)",
                    fontFamily: "var(--font-display)",
                    fontSize: "40px",
                    paddingBottom: "8px",
                    fontWeight: 300,
                  }}
                >
                  /
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "9px",
                      letterSpacing: "3px",
                      color: "var(--text3)",
                      marginBottom: "8px",
                    }}
                  >
                    MONTH
                  </div>
                  <input
                    id="mm-input"
                    value={mm}
                    maxLength={2}
                    inputMode="numeric"
                    placeholder="MM"
                    style={inputStyle}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "var(--accent)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "var(--border)")
                    }
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, "");
                      setMm(v);
                      if (v.length === 2)
                        document.getElementById("yyyy-input")?.focus();
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  />
                </div>
                <div
                  style={{
                    color: "var(--text3)",
                    fontFamily: "var(--font-display)",
                    fontSize: "40px",
                    paddingBottom: "8px",
                    fontWeight: 300,
                  }}
                >
                  /
                </div>
                <div style={{ flex: 2 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "9px",
                      letterSpacing: "3px",
                      color: "var(--text3)",
                      marginBottom: "8px",
                    }}
                  >
                    YEAR
                  </div>
                  <input
                    id="yyyy-input"
                    value={yyyy}
                    maxLength={4}
                    inputMode="numeric"
                    placeholder="YYYY"
                    style={inputStyle}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "var(--accent)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "var(--border)")
                    }
                    onChange={(e) => setYyyy(e.target.value.replace(/\D/g, ""))}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  />
                </div>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      color: "#e06060",
                      letterSpacing: "1px",
                      marginBottom: "16px",
                    }}
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                style={{
                  width: "100%",
                  padding: "16px",
                  background: "var(--accent)",
                  border: "none",
                  borderRadius: "8px",
                  color: "var(--bg)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  letterSpacing: "3px",
                  fontWeight: 700,
                  boxShadow: "0 8px 32px var(--glow)",
                }}
              >
                REVEAL MY TIMELINE
              </motion.button>

              <div
                style={{
                  marginTop: "14px",
                  fontFamily: "var(--font-body)",
                  fontSize: "12px",
                  color: "var(--text3)",
                }}
              >
                No account needed · Nothing stored on our servers
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="locked"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              style={{ textAlign: "center" }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  border: "2px solid var(--accent)",
                  boxShadow: "0 0 32px var(--glow)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                  fontSize: "24px",
                  color: "var(--accent)",
                }}
              >
                +
              </motion.div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "28px",
                  color: "var(--accent)",
                  fontStyle: "italic",
                  marginBottom: "8px",
                }}
              >
                {savedDob ? "Welcome back." : "Decoding your timeline..."}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "13px",
                  color: "var(--text3)",
                }}
              >
                scroll down
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2 }}
        style={{
          position: "absolute",
          bottom: "28px",
          fontFamily: "var(--font-mono)",
          fontSize: "10px",
          color: "var(--text3)",
          letterSpacing: "3px",
        }}
      >
        scroll to explore
      </motion.div>
    </div>
  );
}
