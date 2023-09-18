import type { World } from "miniplex";
import { Howl } from "howler";

import type { IUpdatable } from "../../../interfaces/updatable.interface";
import gunSfxUrl from "../../assets/gun-sfx/Air-rifle-gun-shot.mp3";

import type { BulletEntity, Entity, IQueries } from "../../entities";
import { EventChecker } from "../../utilities/event-checker";

const isNotUndefined = <T>(value: T | undefined): value is T =>
  value !== undefined;

/**
 * @dependency Dependencies:
 * - `ShootEvent`
 * @sideEffect Side Effects:
 * - Create `BulletEntity`
 */
export class ProjectileSystem implements IUpdatable {
  private fireSFX = new Howl({
    src: [gunSfxUrl],
    volume: 0.3,
  });

  public update(world: World<Entity>, queries: IQueries): void {
    const { events } = queries.Event.first!;

    const shootEvents = events.filter(EventChecker.isShootEvent);
    if (shootEvents.length !== 0) {
      const agentIds = queries.player.entities
        .map((item) => world.id(item))
        .filter(isNotUndefined);
      shootEvents.forEach(({ paylaod: { angle, ownerId, x, y } }) => {
        this.fireSFX.play();

        world.add<BulletEntity>({
          attackEffect: {
            damage: 1,
            isGone: false,
            owner: ownerId,
            speed: 1.2,
            targets: agentIds.filter((item) => item !== ownerId),
          },
          particle: {
            angle,
            pos: {
              x: x + Math.cos(angle) * 40,
              y: y + Math.sin(angle) * 40,
            },
            size: 5,
          },
        });
      });
    }
  }
}
