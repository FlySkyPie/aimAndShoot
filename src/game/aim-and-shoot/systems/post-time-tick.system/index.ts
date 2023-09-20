import type { World } from "miniplex";

import type { IUpdatable, IDisposable } from "../../../interfaces";

import type { Entity, IQueries } from "../../entities";

export class PostTimeTickSystem implements IUpdatable, IDisposable {
  update(_: World<Entity>, queries: IQueries): void {
    const { timeComponent } = queries.Time.first!;

    timeComponent.prevTime = timeComponent.nextTime;
  }

  public dispose(): void {
    /** Nothing to release */
  }
}
