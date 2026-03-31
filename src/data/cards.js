// ── CARD CATEGORIES ───────────────────────────────────────
// Each card: { id, category, tier, hook, front, back }
// hook: 'surprise' | 'reflection' | 'identity' | 'urgency' | 'comparison'
// tier: 'free' | 'premium'

export const CATEGORIES = {
  TIME: { label: "Time", icon: "⏳", color: "#d4af37" },
  BIOLOGY: { label: "Biology", icon: "🧠", color: "#60c060" },
  ASTRONOMY: { label: "Astronomy", icon: "🪐", color: "#6090e0" },
  PSYCHOLOGY: { label: "Psychology", icon: "🔮", color: "#c060c0" },
  PERSPECTIVE: { label: "Perspective", icon: "🌅", color: "#e08040" },
  IDENTITY: { label: "Identity", icon: "🧬", color: "#60c0c0" },
};

export function getCards(age) {
  if (!age) return [];

  const {
    years,
    months,
    days,
    totalDays,
    totalWeeks,
    totalHours,
    totalMinutes,
    totalSeconds,
    daysUntilBirthday,
    bornOnDay,
    isWeekend,
    birthYear,
    generation,
    planetAges,
  } = age;

  const LIFE_WEEKS = 80 * 52;
  const weeksLived = totalWeeks;
  const weeksLeft = Math.max(0, LIFE_WEEKS - weeksLived);
  const lifePercent = Math.min(100, (weeksLived / LIFE_WEEKS) * 100).toFixed(1);

  const heartbeats = Math.floor(totalMinutes * 70);
  const breaths = Math.floor(totalMinutes * 16);
  const hoursSlept = Math.floor(totalHours * 0.33);
  const kmTravelled = Math.floor(totalDays * 2573763); // earth orbit ~940M km/yr

  return [
    // ── FREE CARDS ──────────────────────────────────────

    {
      id: "time-seconds",
      category: "TIME",
      tier: "free",
      hook: "surprise",
      front: {
        eyebrow: "You have been alive for",
        headline: totalSeconds.toLocaleString(),
        sub: "seconds",
        detail: `${years} years, ${months} months, ${days} days`,
      },
      back: {
        headline: "Every second is irreversible.",
        body: `That number just went up. And it will never stop. The Stoics called this "memento mori" — remember you will die — not as morbid thought, but as the sharpest reminder to live with intention. Your ${totalSeconds.toLocaleString()} seconds are already written into the universe. What you do with the next one is still yours.`,
        quote:
          '"It is not that we have a short time to live, but that we waste a great deal of it." — Seneca',
      },
    },

    {
      id: "time-weeks",
      category: "TIME",
      tier: "free",
      hook: "urgency",
      front: {
        eyebrow: "Of your four thousand weeks",
        headline: weeksLived.toLocaleString(),
        sub: "are already gone",
        detail: `${weeksLeft.toLocaleString()} weeks remaining · ${lifePercent}% elapsed`,
      },
      back: {
        headline: "Four thousand weeks.",
        body: `Oliver Burkeman's brutal truth: the average human life is just 4,000 weeks. You've lived ${weeksLived.toLocaleString()} of them. What makes this number powerful isn't the math — it's the smallness. It fits in your head. It makes the abstract urgency of time suddenly, viscerally real. How many of your weeks have been fully inhabited?`,
        quote:
          '"The most productive use of your time may be to stop pretending you have more of it than you do." — Oliver Burkeman',
      },
    },

    {
      id: "astronomy-planetary",
      category: "ASTRONOMY",
      tier: "free",
      hook: "surprise",
      front: {
        eyebrow: "On Mercury, you would be",
        headline: planetAges?.Mercury ?? "—",
        sub: "years old",
        detail: `On Mars: ${planetAges?.Mars ?? "—"} · On Jupiter: ${planetAges?.Jupiter ?? "—"}`,
      },
      back: {
        headline: "You are a different age on every planet.",
        body: `A year is just how long it takes a planet to orbit the sun. Mercury does it in 88 Earth days. Jupiter takes 12 Earth years. Your age is not a fixed truth — it's a measurement relative to where you're standing. On Mercury, you'd already be ancient. On Jupiter, you might still be a child. Identity is context.`,
        quote:
          '"The universe is under no obligation to make sense to you." — Neil deGrasse Tyson',
      },
    },

    {
      id: "identity-generation",
      category: "IDENTITY",
      tier: "free",
      hook: "identity",
      front: {
        eyebrow: "You belong to",
        headline: generation,
        sub: `Born ${birthYear}`,
        detail: "A cohort shaped by shared history",
      },
      back: {
        headline: `What it means to be ${generation}.`,
        body: getGenerationBack(generation),
        quote: getGenerationQuote(generation),
      },
    },

    {
      id: "biology-heartbeats",
      category: "BIOLOGY",
      tier: "free",
      hook: "surprise",
      front: {
        eyebrow: "Your heart has beaten approximately",
        headline: heartbeats.toLocaleString(),
        sub: "times",
        detail: `${breaths.toLocaleString()} breaths · ${hoursSlept.toLocaleString()} hours slept`,
      },
      back: {
        headline: "Your body is a machine that has never stopped.",
        body: `Since the moment you were born, your heart has been contracting roughly 70 times per minute without a single conscious thought from you. It has done this through every sleep, every heartbreak, every ordinary Tuesday. That's ${heartbeats.toLocaleString()} acts of quiet, relentless loyalty from a fist-sized muscle in your chest.`,
        quote:
          '"The human body is the best picture of the human soul." — Ludwig Wittgenstein',
      },
    },

    {
      id: "time-distance",
      category: "ASTRONOMY",
      tier: "free",
      hook: "surprise",
      front: {
        eyebrow: "You have travelled through space",
        headline: kmTravelled.toLocaleString(),
        sub: "kilometres",
        detail: "Orbiting the sun at 107,000 km/h",
      },
      back: {
        headline: "You have never been still — not even once.",
        body: `Earth orbits the sun at 107,000 kilometres per hour. Even in your most static moments — asleep, sitting still, doing nothing — you are hurtling through space at extraordinary speed. In your lifetime so far, you've covered ${kmTravelled.toLocaleString()} km without taking a single step. Stillness is an illusion.`,
        quote:
          '"Equipped with his five senses, man explores the universe around him and calls the adventure Science." — Edwin Hubble',
      },
    },

    {
      id: "psychology-brain-now",
      category: "PSYCHOLOGY",
      tier: "free",
      hook: "identity",
      front: {
        eyebrow: "At age " + years + ", your brain is",
        headline: getBrainState(years).title,
        sub: getBrainState(years).sub,
        detail: "Based on cognitive neuroscience research",
      },
      back: {
        headline: getBrainState(years).backHeadline,
        body: getBrainState(years).body,
        quote: getBrainState(years).quote,
      },
    },

    {
      id: "perspective-birthday",
      category: "PERSPECTIVE",
      tier: "free",
      hook: "reflection",
      front: {
        eyebrow: "You were born on a",
        headline: bornOnDay,
        sub: isWeekend ? "A weekend child" : "A weekday child",
        detail: `Your next birthday is in ${daysUntilBirthday} days`,
      },
      back: {
        headline: "The day you arrived changed everything.",
        body: `On the day you were born, the people who would love you most hadn't met you yet. They were living ordinary lives with no idea what was coming. Then you arrived — on a ${bornOnDay} — and rearranged their entire world. You've been doing that to people ever since, often without knowing it.`,
        quote:
          '"We do not remember days, we remember moments." — Cesare Pavese',
      },
    },

    // ── PREMIUM CARDS ────────────────────────────────────

    {
      id: "psychology-peak",
      category: "PSYCHOLOGY",
      tier: "premium",
      hook: "comparison",
      front: {
        eyebrow: "Your cognitive peak window",
        headline: getCognitivePeak(years).window,
        sub: getCognitivePeak(years).status,
        detail: "Based on fluid and crystallized intelligence research",
      },
      back: {
        headline: getCognitivePeak(years).backHeadline,
        body: getCognitivePeak(years).body,
        quote:
          '"Intelligence is not fixed. It is a verb, not a noun." — Carol Dweck',
      },
    },

    {
      id: "perspective-life-grid",
      category: "PERSPECTIVE",
      tier: "premium",
      hook: "urgency",
      front: {
        eyebrow: "Your life in weeks",
        headline: `${weeksLived} lived`,
        sub: `of ${LIFE_WEEKS.toLocaleString()} total`,
        detail: "Each square is one week of your life",
      },
      back: {
        headline: "What does your grid look like?",
        body: `Tim Urban's "Life in Weeks" visualization makes the abstract visceral: draw a grid of 4,160 squares (80 years × 52 weeks). Shade the ones you've lived. What remains is the white space — the weeks you haven't written yet. You've filled ${weeksLived} squares. The pen is still in your hand.`,
        quote:
          '"Most people overestimate what they can do in one year and underestimate what they can do in ten." — Bill Gates',
      },
    },

    {
      id: "identity-archetype",
      category: "IDENTITY",
      tier: "premium",
      hook: "identity",
      front: {
        eyebrow: "Your life archetype",
        headline: getArchetype(years, birthYear).name,
        sub: getArchetype(years, birthYear).phase,
        detail: "Based on Jungian life stage theory",
      },
      back: {
        headline: getArchetype(years, birthYear).backHeadline,
        body: getArchetype(years, birthYear).body,
        quote: getArchetype(years, birthYear).quote,
      },
    },

    {
      id: "biology-brain-development",
      category: "BIOLOGY",
      tier: "premium",
      hook: "identity",
      front: {
        eyebrow: "Your prefrontal cortex",
        headline:
          years >= 25
            ? "Fully online"
            : `${Math.round((years / 25) * 100)}% developed`,
        sub:
          years >= 25
            ? "Decision-making at full capacity"
            : "Still building its most complex circuits",
        detail: "The prefrontal cortex fully matures around age 25",
      },
      back: {
        headline:
          "The last part of your brain to develop is also the most human.",
        body: `The prefrontal cortex — responsible for planning, impulse control, and complex decision-making — is the final region of the brain to mature. It fully develops around age 25–30. Before that, the brain literally runs on an older, more emotional system. This is not weakness. It is biology. ${years < 25 ? `At ${years}, your brain is still constructing its highest floors. Every challenge you navigate now is literally building your mind.` : `At ${years}, your prefrontal cortex is fully online. The architecture is complete. Now it's about what you build with it.`}`,
        quote: '"The brain is wider than the sky." — Emily Dickinson',
      },
    },

    {
      id: "time-future",
      category: "TIME",
      tier: "premium",
      hook: "reflection",
      front: {
        eyebrow: "If you live to 80, you have",
        headline: weeksLeft.toLocaleString(),
        sub: "weeks remaining",
        detail: `Approximately ${Math.floor(weeksLeft / 52)} years · ${Math.floor(weeksLeft / 4)} months`,
      },
      back: {
        headline: "What would you do with that much time?",
        body: `${weeksLeft.toLocaleString()} weeks is still an extraordinary amount of time — if you use it with intention. In that time, you could read over 2,000 books, learn 5 new languages, build something the world has never seen, or simply become more deeply yourself. The question isn't whether you have enough time. It's whether you're treating it as the finite, precious resource it is.`,
        quote:
          '"The two most important days in your life are the day you are born and the day you find out why." — Mark Twain',
      },
    },
  ];
}

// ── HELPER FUNCTIONS ──────────────────────────────────────

function getBrainState(age) {
  if (age < 20)
    return {
      title: "In overdrive",
      sub: "Highest processing speed of your life",
      backHeadline: "Your brain is running faster than it ever will again.",
      body: 'Between ages 0–19, information processing speed peaks around 18–19. Your brain is undergoing "network consolidation" — pruning unused synapses to become more efficient. You absorb new information faster than any adult. The world feels intense because your brain is literally running at maximum sensitivity.',
      quote:
        '"Young people are in a condition like permanent intoxication, because youth is sweet and they are growing." — Aristotle',
    };
  if (age < 30)
    return {
      title: "At peak power",
      sub: "Prefrontal cortex fully online by 25",
      backHeadline:
        "You are operating at the highest balanced capacity of your life.",
      body: "Short-term memory peaks around 25. Sustained attention and complex task ability plateau around 30–32. This is the window when the brain is most balanced — fast enough to learn rapidly, mature enough to plan deeply. The mid-20s to early 30s are when the most transformative personal decisions tend to be made.",
      quote:
        '"In youth we learn; in age we understand." — Marie von Ebner-Eschenbach',
    };
  if (age < 50)
    return {
      title: "Deepening wisdom",
      sub: "Crystallized intelligence rising",
      backHeadline: "Your brain is trading speed for depth — and winning.",
      body: "Processing speed slows slightly, but emotional intelligence, pattern recognition, and crystallized intelligence — accumulated knowledge and expertise — are rising. You're becoming better at filtering out irrelevance and seeing the bigger picture. This is when great leaders, writers, and thinkers tend to produce their most significant work.",
      quote:
        '"The afternoon of human life must also have a significance of its own." — Carl Jung',
    };
  if (age < 70)
    return {
      title: "Peak wisdom",
      sub: "Emotional intelligence at its highest",
      backHeadline:
        "You have arrived at what neuroscience calls the wisdom years.",
      body: "Conscientiousness peaks around 65. Emotional stability peaks around 75. Crystallized intelligence — the ability to use accumulated knowledge effectively — peaks in the 60s and 70s. The brain becomes remarkably good at managing complexity, reading others, and making decisions that younger brains simply cannot.",
      quote: '"Know thyself." — Socrates',
    };
  return {
    title: "Master consciousness",
    sub: "Emotional stability at its peak",
    backHeadline:
      "Science confirms what ancient cultures always knew: elders carry the deepest intelligence.",
    body: "Emotional stability peaks around age 75. Long-term memory, narrative intelligence, and the ability to integrate complex life experience create a form of wisdom that is simply unavailable to younger minds. Many cultures throughout history have made their most important decisions only with elder counsel. There is a reason for that.",
    quote:
      '"To know how to grow old is the master work of wisdom." — Henri Amiel',
  };
}

function getCognitivePeak(age) {
  if (age < 25)
    return {
      window: "Approaching",
      status: "Your peak cognitive window opens at ~25",
      backHeadline: "You are still building toward your most powerful years.",
      body: "Fluid intelligence — processing speed, working memory, pattern recognition — peaks around age 25. You are still in the ascent. Every challenge you take on now is literally strengthening the neural pathways that will carry you through your peak years.",
    };
  if (age <= 35)
    return {
      window: "Right now",
      status: "You are inside your peak cognitive window",
      backHeadline:
        "This is statistically the most cognitively powerful period of your life.",
      body: "You are in the overlap zone — fluid intelligence still near peak, crystallized intelligence actively building. This window is rare and brief. The people who use it most intentionally tend to look back on these years as the ones that defined everything.",
    };
  if (age <= 60)
    return {
      window: "Crystallizing",
      status: "Wisdom intelligence is rising",
      backHeadline:
        "You are past fluid peak — but crystallized intelligence is the more powerful form.",
      body: "Fluid intelligence has peaked, but crystallized intelligence — built from experience, pattern recognition, and accumulated knowledge — continues rising well into your 60s. Many of humanity's greatest works were created in this window. Einstein published special relativity at 26 but his most nuanced thinking came decades later.",
    };
  return {
    window: "Wisdom peak",
    status: "Crystallized intelligence at maximum",
    backHeadline:
      "You carry cognitive resources that younger minds simply cannot access.",
    body: "Crystallized intelligence — the sum of everything you have learned, experienced, and integrated — peaks in the 60s and 70s. This is not a consolation prize. It is a different and arguably more powerful form of intelligence than the raw processing speed of youth.",
  };
}

function getArchetype(age, birthYear) {
  if (age < 20)
    return {
      name: "The Seeker",
      phase: "Formation",
      backHeadline: "You are still becoming.",
      body: "In Jungian psychology, the first stage of life is the formation of the ego — the construction of a self that can face the world. You are in the most creative period of identity formation. The Seeker is drawn to intensity, meaning, and discovery. Everything feels significant because everything is: you are literally deciding who you are.",
      quote:
        '"Who in the world am I? Ah, that\'s the great puzzle." — Lewis Carroll',
    };
  if (age < 40)
    return {
      name: "The Builder",
      phase: "Expansion",
      backHeadline: "You are creating the structures your life will rest on.",
      body: "Jung described early adulthood as the phase of expansion — building career, relationships, identity, contribution. The Builder archetype is oriented toward the external world: creating, achieving, proving. This is necessary and powerful. But Jung also warned: the first half of life prepares you for the second, and the second is where meaning lives.",
      quote:
        '"The privilege of a lifetime is to become who you truly are." — Carl Jung',
    };
  if (age < 60)
    return {
      name: "The Transformer",
      phase: "Individuation",
      backHeadline:
        "You are crossing the bridge between achievement and meaning.",
      body: 'Jung called the midlife transition "individuation" — the process of becoming a whole, integrated person rather than a role-playing self. The Transformer archetype confronts questions the Builder never had time for: What do I actually value? What have I been avoiding? What is the second half of my life for? This is not a crisis. It is an awakening.',
      quote:
        '"At midlife, the hero\'s journey turns inward." — Joseph Campbell',
    };
  return {
    name: "The Sage",
    phase: "Integration",
    backHeadline: "You have earned the most valuable thing: perspective.",
    body: "The Sage archetype carries the integrated wisdom of a fully lived life. In Jungian terms, you have moved through formation, expansion, and individuation into the final stage: integration — where experience, reflection, and acceptance converge into something that can only be called wisdom. What you have learned cannot be taught. It can only be witnessed.",
    quote:
      "\"In the end, it's not the years in your life that count. It's the life in your years.\" — Abraham Lincoln",
  };
}

function getGenerationBack(generation) {
  const map = {
    "Silent Generation":
      "You were born into scarcity and shaped by sacrifice. The Silent Generation was told to be seen and not heard — to trust institutions, work hard, and ask nothing in return. And yet you quietly built the foundations of the modern world.",
    "Baby Boomer":
      "You were born into optimism. After the devastation of WWII, the world desperately wanted hope — and your generation arrived as its embodiment. You shaped civil rights, rock and roll, and the post-war economic miracle.",
    "Generation X":
      'You grew up in the gap — between analog and digital, between Cold War paranoia and internet utopia. The "X" was intentional: undefined, skeptical, self-reliant. You watched institutions fail and decided to build your own.',
    Millennial:
      "You inherited a world of promise and then watched it restructure. 9/11, the 2008 crash, the smartphone revolution — all before 30. In Kenya, your generation built on mobile money and reimagined what African entrepreneurship could look like.",
    "Generation Z":
      "You never knew a world without the internet. You were handed a climate crisis, a pandemic, and a political reckoning before you turned 25. In 2024, Kenya's Gen Z showed the world what civic power looks like in the digital age.",
    "Generation Alpha":
      "You are the first generation born entirely in the 21st century. AI has been present for much of your conscious life. You will define what it means to be human in the age of intelligent machines.",
  };
  return (
    map[generation] ||
    "Your generation carries a story unique to its moment in history."
  );
}

function getGenerationQuote(generation) {
  const map = {
    "Silent Generation":
      '"The greatest generation built; the silent generation maintained. Both were essential." — Anonymous',
    "Baby Boomer":
      '"We were the first generation to believe we could change the world. Some of us still do." — Anonymous Boomer',
    "Generation X":
      '"We didn\'t have a defining moment. We had a defining absence." — Douglas Coupland',
    Millennial:
      '"We are not the participation trophy generation. We are the generation that was handed a broken world and told to fix it." — Anonymous',
    "Generation Z":
      '"We didn\'t start the fire. But we refuse to let it burn." — Gen Z, 2024',
    "Generation Alpha":
      '"The future is not something that happens to you. It is something you build." — Unknown',
  };
  return (
    map[generation] ||
    '"Every generation imagines itself to be more intelligent than the one that went before it." — George Orwell'
  );
}
