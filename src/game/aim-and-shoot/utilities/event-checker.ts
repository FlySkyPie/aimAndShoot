import type { GameEvent, ShootEvent } from "../events";

export abstract class EventChecker {
  public static isShootEvent(event: GameEvent): event is ShootEvent {
    return event.type === "shoot-event";
  }
}
