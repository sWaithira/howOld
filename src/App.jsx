import { useState, useEffect } from "react";
import { useLiveAge } from "./hooks/useLiveAge";
import Zone01Identify from "./zones/Zone01Identify";
import Zone02Cards from "./zones/Zone02Cards";
import { ensureAuth } from "./firebase";
import { initUserDoc } from "./services/firestore";
import "./styles/globals.css";

const STORAGE_KEY = "howold_dob";

export default function App() {
  const [dob, setDob] = useState(() => localStorage.getItem(STORAGE_KEY) || "");
  const [user, setUser] = useState(null);
  const [userDoc, setUserDoc] = useState(null);
  const age = useLiveAge(dob);

  useEffect(() => {
    ensureAuth().then(setUser);
  }, []);

  useEffect(() => {
    if (!user || !age) return;
    initUserDoc(user.uid, {
      generation: age.generation,
      birthYear: age.birthYear,
      dob,
    }).then(setUserDoc);
  }, [user, age?.generation]);

  const handleDateSet = (iso) => {
    localStorage.setItem(STORAGE_KEY, iso);
    setDob(iso);
    setTimeout(() => {
      document
        .querySelector("[data-scroll-container]")
        ?.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    }, 1000);
  };

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setDob("");
    setUserDoc(null);
    document
      .querySelector("[data-scroll-container]")
      ?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="grain"
      data-scroll-container
      style={{
        height: "100vh",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
        scrollBehavior: "smooth",
      }}
    >
      <Zone01Identify onDateSet={handleDateSet} savedDob={dob} />
      <Zone02Cards
        age={age}
        user={user}
        userDoc={userDoc}
        onReset={handleReset}
      />
    </div>
  );
}
