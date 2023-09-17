import type { World } from "miniplex";

import type { IUpdatable } from "../../../interfaces/updatable.interface";

import type { Entity, IQueries } from "../../entities";

export class EventSystem implements IUpdatable {
  update(_: World<Entity>, queries: IQueries): void {
    const Event = queries.Event.first!;
    Event.events = [...Event.eventQueue];
    Event.eventQueue = [];

    console.log("Event", Event);
  }
}
