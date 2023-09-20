import { Game } from "../game/game";

export class BattleZone extends HTMLElement {
  private game: Game | null = null;

  connectedCallback() {
    const canvas = document.createElement("canvas");
    this.append(canvas);
    canvas.width = 1024;
    canvas.height = 1024;
    canvas.style.width = "100%";
    canvas.style.height = "100%";

    this.game = new Game(canvas);
    this.game.start();
  }

  disconnectedCallback() {
    this.game?.dispose();
  }
}
