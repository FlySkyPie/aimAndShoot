import type { IGameEventMap } from "../game/interfaces/game-event-map";
import { Game } from "../game/game";

export class BattleZone extends HTMLElement {
  private game: Game | null = null;

  public on<TEventName extends keyof IGameEventMap & string>(
    eventName: TEventName,
    handler: (...eventArg: IGameEventMap[TEventName]) => void
  ): void {
    this.game?.on(eventName, handler);
  }

  public off<TEventName extends keyof IGameEventMap & string>(
    eventName: TEventName,
    handler: (...eventArg: IGameEventMap[TEventName]) => void
  ): void {
    this.game?.off(eventName, handler);
  }

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
