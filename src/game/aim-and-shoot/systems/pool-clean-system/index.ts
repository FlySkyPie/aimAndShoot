import type { World } from "miniplex";

import type { IUpdatable, IDisposable } from "../../../interfaces";

import type { Entity, IQueries } from "../../entities";

/**
 * @sideEffect Side Effects:
 * - Remove `BulletEntity`
 */
export class PoolCleanSystem implements IUpdatable, IDisposable {
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

  public dispose(): void {
    /** Nothing to release */
  }
}
