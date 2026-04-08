// ── CARD DECK THEMES ──────────────────────────────────────
// Each deck theme defines the visual identity of the cards
// CSS patterns simulate illustrated backs — real art replaces later

export const CARD_DECKS = [
  {
    id: "nautical",
    label: "Nautical",
    icon: "",
    tier: "free",
    description: "Antique maps, compasses, ocean winds",
    accent: "#4a8fa8",
    accent2: "#c8a050",
    cardBg: "linear-gradient(145deg, #0a1628 0%, #0d2040 50%, #0a1628 100%)",
    backPattern: `
      radial-gradient(circle at 50% 50%, rgba(74,143,168,0.15) 0%, transparent 60%),
      repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(74,143,168,0.06) 29px),
      repeating-linear-gradient(90deg, transparent, transparent 28px, rgba(74,143,168,0.06) 29px),
      linear-gradient(145deg, #080f1e 0%, #0c1a30 50%, #080f1e 100%)
    `,
    borderStyle: "1px solid rgba(74,143,168,0.35)",
    cornerSvg: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="30" r="24" fill="none" stroke="rgba(74,143,168,0.5)" stroke-width="1"/>
      <circle cx="30" cy="30" r="18" fill="none" stroke="rgba(74,143,168,0.3)" stroke-width="0.5"/>
      <line x1="30" y1="6" x2="30" y2="54" stroke="rgba(74,143,168,0.3)" stroke-width="0.5"/>
      <line x1="6" y1="30" x2="54" y2="30" stroke="rgba(74,143,168,0.3)" stroke-width="0.5"/>
      <line x1="13" y1="13" x2="47" y2="47" stroke="rgba(74,143,168,0.2)" stroke-width="0.5"/>
      <line x1="47" y1="13" x2="13" y2="47" stroke="rgba(74,143,168,0.2)" stroke-width="0.5"/>
      <polygon points="30,8 32,28 30,32 28,28" fill="rgba(200,160,80,0.8)"/>
    </svg>`,
    centerSvg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(74,143,168,0.2)" stroke-width="1"/>
      <circle cx="100" cy="100" r="50" fill="none" stroke="rgba(74,143,168,0.15)" stroke-width="1"/>
      <circle cx="100" cy="100" r="30" fill="none" stroke="rgba(74,143,168,0.1)" stroke-width="1"/>
      <line x1="100" y1="30" x2="100" y2="170" stroke="rgba(74,143,168,0.15)" stroke-width="0.5"/>
      <line x1="30" y1="100" x2="170" y2="100" stroke="rgba(74,143,168,0.15)" stroke-width="0.5"/>
      <path d="M100 55 L108 90 L100 100 L92 90 Z" fill="rgba(200,160,80,0.6)"/>
      <path d="M100 145 L108 110 L100 100 L92 110 Z" fill="rgba(74,143,168,0.4)"/>
      <circle cx="100" cy="100" r="6" fill="rgba(200,160,80,0.8)"/>
      <text x="100" y="175" text-anchor="middle" font-family="serif" font-size="9" fill="rgba(74,143,168,0.5)" letter-spacing="3">HOWOLD</text>
    </svg>`,
  },

  {
    id: "astronomy",
    label: "Astronomy",
    icon: "",
    tier: "free",
    description: "Planets, constellations, deep space",
    accent: "#7090e0",
    accent2: "#e0c060",
    cardBg: "linear-gradient(145deg, #060810 0%, #0a0e1c 50%, #060810 100%)",
    backPattern: `
      radial-gradient(circle at 20% 20%, rgba(112,144,224,0.12) 0%, transparent 40%),
      radial-gradient(circle at 80% 80%, rgba(224,192,96,0.08) 0%, transparent 40%),
      radial-gradient(circle at 60% 30%, rgba(255,255,255,0.04) 0%, transparent 20%),
      linear-gradient(145deg, #05070f 0%, #080c18 50%, #05070f 100%)
    `,
    borderStyle: "1px solid rgba(112,144,224,0.3)",
    cornerSvg: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="30" r="20" fill="none" stroke="rgba(112,144,224,0.4)" stroke-width="0.5" stroke-dasharray="3,4"/>
      <circle cx="30" cy="30" r="4" fill="rgba(224,192,96,0.7)"/>
      <circle cx="30" cy="10" r="2" fill="rgba(255,255,255,0.5)"/>
      <circle cx="50" cy="30" r="1.5" fill="rgba(255,255,255,0.4)"/>
      <circle cx="15" cy="20" r="1" fill="rgba(255,255,255,0.3)"/>
      <circle cx="45" cy="45" r="1" fill="rgba(255,255,255,0.3)"/>
    </svg>`,
    centerSvg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(112,144,224,0.15)" stroke-width="0.5" stroke-dasharray="4,6"/>
      <circle cx="100" cy="100" r="40" fill="none" stroke="rgba(112,144,224,0.1)" stroke-width="0.5"/>
      <circle cx="100" cy="100" r="18" fill="rgba(112,144,224,0.15)" stroke="rgba(112,144,224,0.3)" stroke-width="1"/>
      <ellipse cx="100" cy="100" rx="32" ry="8" fill="none" stroke="rgba(224,192,96,0.3)" stroke-width="0.8" transform="rotate(-20 100 100)"/>
      <circle cx="100" cy="60" r="3" fill="rgba(255,255,255,0.6)"/>
      <circle cx="140" cy="80" r="2" fill="rgba(255,255,255,0.4)"/>
      <circle cx="60" cy="130" r="2.5" fill="rgba(255,220,100,0.5)"/>
      <circle cx="150" cy="140" r="1.5" fill="rgba(255,255,255,0.3)"/>
      <circle cx="40" cy="70" r="1" fill="rgba(255,255,255,0.3)"/>
      <line x1="100" y1="60" x2="140" y2="80" stroke="rgba(112,144,224,0.15)" stroke-width="0.5"/>
      <line x1="140" y1="80" x2="60" y2="130" stroke="rgba(112,144,224,0.15)" stroke-width="0.5"/>
      <text x="100" y="178" text-anchor="middle" font-family="serif" font-size="9" fill="rgba(112,144,224,0.4)" letter-spacing="3">HOWOLD</text>
    </svg>`,
  },

  {
    id: "fantasy",
    label: "Fantasy",
    icon: "",
    tier: "premium",
    description: "Knights, dragons, ancient kingdoms",
    accent: "#c0902a",
    accent2: "#8a3030",
    cardBg: "linear-gradient(145deg, #0e0808 0%, #160c0c 50%, #0e0808 100%)",
    backPattern: `
      repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(192,144,42,0.04) 20px, rgba(192,144,42,0.04) 21px),
      repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(192,144,42,0.04) 20px, rgba(192,144,42,0.04) 21px),
      radial-gradient(circle at 50% 50%, rgba(192,144,42,0.08) 0%, transparent 50%),
      linear-gradient(145deg, #0c0606 0%, #140a0a 50%, #0c0606 100%)
    `,
    borderStyle: "1px solid rgba(192,144,42,0.35)",
    cornerSvg: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <polygon points="30,5 35,20 50,20 38,30 43,45 30,36 17,45 22,30 10,20 25,20" fill="none" stroke="rgba(192,144,42,0.5)" stroke-width="0.8"/>
      <circle cx="30" cy="26" r="5" fill="rgba(192,144,42,0.3)" stroke="rgba(192,144,42,0.5)" stroke-width="0.5"/>
    </svg>`,
    centerSvg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <polygon points="100,15 108,60 155,60 118,87 132,132 100,108 68,132 82,87 45,60 92,60" fill="none" stroke="rgba(192,144,42,0.3)" stroke-width="1"/>
      <line x1="100" y1="40" x2="100" y2="160" stroke="rgba(192,144,42,0.4)" stroke-width="1.5"/>
      <line x1="70" y1="85" x2="130" y2="85" stroke="rgba(192,144,42,0.4)" stroke-width="2.5"/>
      <rect x="95" y="155" width="10" height="10" rx="2" fill="rgba(192,144,42,0.4)"/>
      <circle cx="100" cy="85" r="8" fill="rgba(192,144,42,0.2)" stroke="rgba(192,144,42,0.4)" stroke-width="1"/>
      <text x="100" y="180" text-anchor="middle" font-family="serif" font-size="9" fill="rgba(192,144,42,0.4)" letter-spacing="3">HOWOLD</text>
    </svg>`,
  },

  {
    id: "floral",
    label: "Floral",
    icon: "",
    tier: "premium",
    description: "Watercolour botanicals, delicate lines",
    accent: "#c87090",
    accent2: "#90c878",
    cardBg: "linear-gradient(145deg, #100a0c 0%, #180e12 50%, #100a0c 100%)",
    backPattern: `
      radial-gradient(circle at 30% 30%, rgba(200,112,144,0.1) 0%, transparent 40%),
      radial-gradient(circle at 70% 70%, rgba(144,200,120,0.08) 0%, transparent 40%),
      radial-gradient(circle at 70% 20%, rgba(200,112,144,0.06) 0%, transparent 30%),
      linear-gradient(145deg, #0e080a 0%, #160c10 50%, #0e080a 100%)
    `,
    borderStyle: "1px solid rgba(200,112,144,0.3)",
    cornerSvg: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="30" cy="22" rx="6" ry="10" fill="rgba(200,112,144,0.3)" transform="rotate(0 30 22)"/>
      <ellipse cx="38" cy="30" rx="6" ry="10" fill="rgba(200,112,144,0.25)" transform="rotate(72 38 30)"/>
      <ellipse cx="35" cy="42" rx="6" ry="10" fill="rgba(200,112,144,0.2)" transform="rotate(144 35 42)"/>
      <ellipse cx="22" cy="42" rx="6" ry="10" fill="rgba(200,112,144,0.2)" transform="rotate(216 22 42)"/>
      <ellipse cx="20" cy="30" rx="6" ry="10" fill="rgba(200,112,144,0.25)" transform="rotate(288 20 30)"/>
      <circle cx="30" cy="32" r="4" fill="rgba(224,192,96,0.5)"/>
    </svg>`,
    centerSvg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="72" rx="14" ry="26" fill="rgba(200,112,144,0.25)"/>
      <ellipse cx="124" cy="86" rx="14" ry="26" fill="rgba(200,112,144,0.2)" transform="rotate(72 124 86)"/>
      <ellipse cx="116" cy="114" rx="14" ry="26" fill="rgba(200,112,144,0.18)" transform="rotate(144 116 114)"/>
      <ellipse cx="84" cy="114" rx="14" ry="26" fill="rgba(200,112,144,0.18)" transform="rotate(216 84 114)"/>
      <ellipse cx="76" cy="86" rx="14" ry="26" fill="rgba(200,112,144,0.2)" transform="rotate(288 76 86)"/>
      <circle cx="100" cy="96" r="12" fill="rgba(224,192,96,0.35)" stroke="rgba(224,192,96,0.5)" stroke-width="1"/>
      <path d="M60 140 Q80 120 100 96" stroke="rgba(144,200,120,0.4)" stroke-width="1" fill="none"/>
      <path d="M140 150 Q120 130 100 96" stroke="rgba(144,200,120,0.4)" stroke-width="1" fill="none"/>
      <ellipse cx="52" cy="148" rx="10" ry="6" fill="rgba(144,200,120,0.3)" transform="rotate(-30 52 148)"/>
      <ellipse cx="148" cy="156" rx="10" ry="6" fill="rgba(144,200,120,0.3)" transform="rotate(30 148 156)"/>
      <text x="100" y="182" text-anchor="middle" font-family="serif" font-size="9" fill="rgba(200,112,144,0.4)" letter-spacing="3">HOWOLD</text>
    </svg>`,
  },

  {
    id: "steampunk",
    label: "Steampunk",
    icon: "",
    tier: "premium",
    description: "Gears, brass, Victorian mechanics",
    accent: "#b8822a",
    accent2: "#708090",
    cardBg: "linear-gradient(145deg, #0c0a06 0%, #141008 50%, #0c0a06 100%)",
    backPattern: `
      repeating-radial-gradient(circle at 50% 50%, transparent 20px, rgba(184,130,42,0.03) 21px, transparent 22px),
      repeating-linear-gradient(0deg, transparent, transparent 14px, rgba(184,130,42,0.04) 15px),
      repeating-linear-gradient(90deg, transparent, transparent 14px, rgba(184,130,42,0.04) 15px),
      linear-gradient(145deg, #0a0806 0%, #120e08 50%, #0a0806 100%)
    `,
    borderStyle: "1px solid rgba(184,130,42,0.4)",
    cornerSvg: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="30" r="18" fill="none" stroke="rgba(184,130,42,0.4)" stroke-width="1"/>
      <circle cx="30" cy="30" r="12" fill="none" stroke="rgba(184,130,42,0.3)" stroke-width="0.5"/>
      <circle cx="30" cy="30" r="5" fill="rgba(184,130,42,0.4)"/>
      ${[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]
        .map((a) => {
          const r1 = 18,
            r2 = 22,
            rad = (a * Math.PI) / 180;
          const x1 = 30 + r1 * Math.cos(rad),
            y1 = 30 + r1 * Math.sin(rad);
          const x2 = 30 + r2 * Math.cos(rad),
            y2 = 30 + r2 * Math.sin(rad);
          return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgba(184,130,42,0.5)" stroke-width="1.5"/>`;
        })
        .join("")}
    </svg>`,
    centerSvg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="55" fill="none" stroke="rgba(184,130,42,0.25)" stroke-width="1"/>
      <circle cx="100" cy="100" r="38" fill="none" stroke="rgba(184,130,42,0.2)" stroke-width="0.5"/>
      <circle cx="100" cy="100" r="18" fill="rgba(184,130,42,0.15)" stroke="rgba(184,130,42,0.4)" stroke-width="1.5"/>
      <circle cx="100" cy="100" r="8" fill="rgba(184,130,42,0.5)"/>
      ${[
        0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270,
        292.5, 315, 337.5,
      ]
        .map((a) => {
          const r1 = 55,
            r2 = 62,
            rad = (a * Math.PI) / 180;
          const x1 = 100 + r1 * Math.cos(rad),
            y1 = 100 + r1 * Math.sin(rad);
          const x2 = 100 + r2 * Math.cos(rad),
            y2 = 100 + r2 * Math.sin(rad);
          return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="rgba(184,130,42,0.4)" stroke-width="2"/>`;
        })
        .join("")}
      <circle cx="155" cy="65" r="20" fill="none" stroke="rgba(112,128,144,0.3)" stroke-width="1"/>
      <circle cx="155" cy="65" r="12" fill="rgba(112,128,144,0.15)" stroke="rgba(112,128,144,0.25)" stroke-width="0.5"/>
      <circle cx="155" cy="65" r="5" fill="rgba(112,128,144,0.4)"/>
      <text x="100" y="182" text-anchor="middle" font-family="serif" font-size="9" fill="rgba(184,130,42,0.4)" letter-spacing="3">HOWOLD</text>
    </svg>`,
  },
];
