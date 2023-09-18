import type { World } from "miniplex";

import type { IUpdatable } from "../../../interfaces/updatable.interface";

import type { AgentEntity, Entity, IQueries } from "../../entities";
import { ParticleComponent } from "../../components";

/**
 * @sideEffect Side Effects:
 * - Modifiy `BulletEntity`
 * - Modifiy `AgentEntity`
 */
export class DamageSystem implements IUpdatable {
  public update(world: World<Entity>, queries: IQueries): void {
    for (const bullet of queries.bullet) {
      const { particle, attackEffect } = bullet;
      const { angle, size } = particle;
      const { targets, owner: ownerId } = attackEffect;
      const owner = world.entity(ownerId) as AgentEntity;

      for (const agentId of targets) {
        const agent = world.entity(agentId) as AgentEntity ;
        // if (!agent) {
        //   continue;
        // }
        if (agent.warrior.isDead) {
          continue;
        }

        if (
          DamageSystem.distance(agent.particle, particle) <
          agent.particle.size + size
        ) {
          if (owner.brain !== agent.brain) owner.statistics.hits++;
          else owner.statistics.friendlyFire++;

          agent.warrior.speed.x += Math.cos(angle) * 0.1;
          agent.warrior.speed.y += Math.sin(angle) * 0.1;
          agent.health.current -= attackEffect.damage;

          attackEffect.isGone = true;
          break;
        }
      }
    }
  }

  private static distance(
    p0: ParticleComponent,
    p1: ParticleComponent
  ): number {
    return Math.sqrt((p0.pos.x - p1.pos.x) ** 2 + (p0.pos.y - p1.pos.y) ** 2);
  }
}
