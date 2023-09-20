import type { World } from "miniplex";

import type { IUpdatable, IDisposable } from "../../../interfaces";

import type { Entity, IQueries } from "../../entities";

export class TimeTickSystem implements IUpdatable, IDisposable {
  public update(_: World<Entity>, queries: IQueries): void {
    const { timeComponent } = queries.Time.first!;
    timeComponent.nextTime = Date.now();
    timeComponent.deltaTime = timeComponent.nextTime - timeComponent.prevTime;
    timeComponent.totalTime += timeComponent.deltaTime;
  }

  public dispose(): void {
    /** Nothing to release */
  }
}
