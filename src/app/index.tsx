import React from "react";
import ReactDOM from "react-dom/client";

import { CombatPanelComponent } from "./combat-panel";

export class CombatPanel extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    ReactDOM.createRoot(this).render(
      <React.StrictMode>
        <CombatPanelComponent />
      </React.StrictMode>
    );
  }
}
