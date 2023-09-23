import type { World } from "miniplex";
import type { IDisposable, IUpdatable } from "../../../interfaces";
import type { IGameEventMap } from "../../../interfaces/game-event-map";
import type { TypedEventEmitter } from "../../../utilities/typed-event-emitter";

import type { Entity, IQueries } from "../../entities";
import { EventChecker } from "../../utilities/event-checker";

type IAgentSimpleStatus = {
  id: string;
  health: number;
};

export class ExternalEventSystem implements IUpdatable, IDisposable {
  private lastUpdate: number;
  constructor(private emitter: TypedEventEmitter<IGameEventMap>) {
    this.lastUpdate = performance.now();
  }

  public update(_: World<Entity>, queries: IQueries): void {
    const { events } = queries.Event.first!;
    events.filter(EventChecker.isAgentDeadEvent).forEach(({ payload }) => {
      this.emitter.emit("agent-dead", payload);
    });
    events.filter(EventChecker.isCombatStartedEvent).forEach(({ payload }) => {
      this.emitter.emit("combate-start", payload);
    });

    const currentTime = performance.now();
    if (currentTime - this.lastUpdate > 300) {
      this.lastUpdate = currentTime;

      const agents: IAgentSimpleStatus[] = [];
      for (const { id, health } of queries.player) {
        agents.push({
          id,
          health: health.current / health.max,
        });
      }

      this.emitter.emit("combate-updated", { agents });
    }

    events
      .filter(EventChecker.isCombatStatisticsEvent)
      .forEach(({ payload }) => {
        this.emitter.emit("combate-end", { scoreboard: payload });
      });
  }

  public dispose(): void {
    /** Nothing to release */
  }
}
