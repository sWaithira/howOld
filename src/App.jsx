import { useState } from "react";
import { useLiveAge } from "./hooks/useLiveAge";
import Zone01Identify from "./zones/Zone01Identify";
import Zone02Cards from "./zones/Zone02Cards";
import "./styles/globals.css";

export default function App() {
  const [dob, setDob] = useState("");
  const age = useLiveAge(dob);

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
      <Zone01Identify onDateSet={setDob} />
      <Zone02Cards age={age} />
    </div>
  );
}
