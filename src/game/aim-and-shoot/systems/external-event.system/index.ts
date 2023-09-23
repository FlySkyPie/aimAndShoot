import type { World } from "miniplex";
import type { IDisposable, IUpdatable } from "../../../interfaces";
import type { IGameEventMap } from "../../../interfaces/game-event-map";
import type { TypedEventEmitter } from "../../../utilities/typed-event-emitter";

import type { Entity, IQueries } from "../../entities";
import { EventChecker } from "../../utilities/event-checker";

export class ExternalEventSystem implements IUpdatable, IDisposable {
  constructor(private emitter: TypedEventEmitter<IGameEventMap>) {}

  public update(_: World<Entity>, queries: IQueries): void {
    const { events } = queries.Event.first!;
    events.filter(EventChecker.isAgentDeadEvent).forEach(({ payload }) => {
      this.emitter.emit("agent-dead", payload);
    });
    events.filter(EventChecker.isCombatStartedEventt).forEach(({ payload }) => {
      this.emitter.emit("combate-start", payload);
    });
  }

  public dispose(): void {
    /** Nothing to release */
  }
}
