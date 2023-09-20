import React from "react";
import ReactDOM from "react-dom/client";

import { BattleZone } from "./web-components/battle-zone";
import { CombatPanel } from "./app/combat-panel";
import "./index.css";

customElements.define("battle-zone", BattleZone);

const element = document.querySelector<HTMLDivElement>("#app")!;

ReactDOM.createRoot(element).render(
  <React.StrictMode>
    <CombatPanel />
  </React.StrictMode>
);
