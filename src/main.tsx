import "./index.css";

import { CombatPanel } from "./app";

customElements.define('combat-panel', CombatPanel);

const panel = document.querySelector<CombatPanel>("combat-panel")!;

console.log(panel)