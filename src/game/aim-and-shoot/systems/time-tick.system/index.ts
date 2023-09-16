import type { World } from "miniplex";

import type { IUpdatable } from "../../../interfaces/updatable.interface";

import type { Entity, IQueries } from "../../entities";

export class TimeTickSystem implements IUpdatable {
  update(_: World<Entity>, queries: IQueries): void {
    const { timeComponent } = queries.Time.first!;
    timeComponent.nextTime = Date.now();
    timeComponent.deltaTime = timeComponent.nextTime - timeComponent.prevTime;
    timeComponent.totalTime += timeComponent.deltaTime;
  }
}
