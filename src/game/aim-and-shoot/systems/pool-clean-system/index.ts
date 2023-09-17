import type { World } from "miniplex";

import type { IUpdatable } from "../../../interfaces/updatable.interface";

import type { Entity, IQueries } from "../../entities";

/**
 * @sideEffect Side Effects:
 * - Remove `BulletEntity`
 */
export class PoolCleanSystem implements IUpdatable {
  public update(world: World<Entity>, queries: IQueries): void {
    for (const bullet of queries.bullet) {
      const {
        attackEffect: { isGone },
      } = bullet;
      if (isGone) {
        world.remove(bullet);
      }
    }
  }
}
