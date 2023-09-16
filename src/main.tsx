import { CombatPanel } from "./app";
import { Game } from "./game/game";
import "./index.css";

customElements.define("combat-panel", CombatPanel);

const panel = document.querySelector<CombatPanel>("combat-panel")!;

panel.addEventListener("canvas-ready", ({ detail }) => {
  const game = new Game(detail);
  game.start();
});
