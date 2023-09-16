import type { World } from "miniplex";

import type { IUpdatable } from "../../../interfaces/updatable.interface";

import type { Entity, IQueries } from "../../entities";
import { Constants } from "../../constants";

export class MovementSystem implements IUpdatable {
  update(_: World<Entity>, queries: IQueries): void {
    const { timeComponent } = queries.Time.first!;
    for (const { attackEffect, particle } of queries.bullet) {
      if (attackEffect.isGone) return;

      if (
        particle.pos.x < -particle.size ||
        particle.pos.y < -particle.size ||
        particle.pos.x > Constants.w + particle.size ||
        particle.pos.y > Constants.h + particle.size
      ) {
        attackEffect.isGone = true;

        return;
      }

      particle.pos.x +=
        Math.cos(particle.angle) * attackEffect.speed * timeComponent.deltaTime;

      particle.pos.y +=
        Math.sin(particle.angle) * attackEffect.speed * timeComponent.deltaTime;
    }
  }
}
