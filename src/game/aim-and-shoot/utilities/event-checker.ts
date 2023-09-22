import type { AgentDeadEvent, GameEvent, ShootEvent } from "../events";

export abstract class EventChecker {
  public static isShootEvent(event: GameEvent): event is ShootEvent {
    return event.type === "shoot-event";
  }

  public static isAgentDeadEvent(event: GameEvent): event is AgentDeadEvent {
    return event.type === "agent-dead";
  }
}
