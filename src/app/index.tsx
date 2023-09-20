import React from "react";
import ReactDOM from "react-dom/client";

import type { CombatPanelEventMap } from "./interfaces/combat-panel.interface";
import { CombatPanel } from "./combat-panel";

export class CombatPanelComponent extends HTMLElement {
  constructor() {
    super();

    ReactDOM.createRoot(this).render(
      <React.StrictMode>
        <CombatPanel />
      </React.StrictMode>
    );
  }

  /**
   * Override type declaration.
   */
  public addEventListener<K extends keyof CombatPanelEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: CombatPanelEventMap[K]) => unknown,
    options?: boolean | AddEventListenerOptions
  ): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    super.addEventListener(type as any, listener, options);
  }

  /**
   * Convert React event to Web API event.
   */
  // private handeCanvasReady = (canvas: HTMLCanvasElement) => {
  //   const event = new CustomEvent("canvas-ready", { detail: canvas });

  //   this.dispatchEvent(event);
  // };
}
