import type { World } from "miniplex";

import type { IUpdatable, IDisposable } from "../../../interfaces";

import type { Entity, IQueries } from "../../entities";

export class EventSystem implements IUpdatable, IDisposable {
  public update(_: World<Entity>, queries: IQueries): void {
    const Event = queries.Event.first!;
    Event.events = [...Event.eventQueue];
    Event.eventQueue = [];
  }

  public dispose(): void {
    /** Nothing to release */
  }
}
