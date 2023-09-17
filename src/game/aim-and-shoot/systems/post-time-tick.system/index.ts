import type { World } from "miniplex";

import type { IUpdatable } from "../../../interfaces/updatable.interface";

import type { Entity, IQueries } from "../../entities";

export class PostTimeTickSystem implements IUpdatable {
  update(_: World<Entity>, queries: IQueries): void {
    const { timeComponent } = queries.Time.first!;

    timeComponent.prevTime = timeComponent.nextTime;
  }
}
