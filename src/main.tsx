import { CombatPanel } from "./app";
import "./index.css";

customElements.define("combat-panel", CombatPanel);

const panel = document.querySelector<CombatPanel>("combat-panel")!;

panel.addEventListener("canvas-ready", ({ detail }) => {
  console.log(detail);
});



