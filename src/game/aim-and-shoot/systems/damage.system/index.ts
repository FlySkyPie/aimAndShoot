import type { World } from "miniplex";

import type { IUpdatable, IDisposable } from "../../../interfaces";

import type { AgentEntity, Entity, IQueries } from "../../entities";
import { ParticleComponent } from "../../components";

/**
 * @sideEffect Side Effects:
 * - Modifiy `BulletEntity`
 * - Modifiy `AgentEntity`
 */
export class DamageSystem implements IUpdatable, IDisposable {
  public update(world: World<Entity>, queries: IQueries): void {
    const { eventQueue } = queries.Event.first!;

    for (const bullet of queries.bullet) {
      const { particle, attackEffect } = bullet;
      const { angle, size } = particle;
      const { targets, owner: ownerId } = attackEffect;
      const owner = world.entity(ownerId) as AgentEntity;

      for (const agentId of targets) {
        const agent = world.entity(agentId) as AgentEntity | undefined;
        if (!agent) {
          continue;
        }
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

          if (agent.health.current <= 0) {
            eventQueue.push({
              type: "agent-dead",
              payload: {
                name: agent.warrior.name,
                isBot: agent.brain !== undefined,
                kiiledBy: owner.warrior.name,
              },
            });
          }

          attackEffect.isGone = true;
          break;
        }
      }
    }
  }

  public dispose(): void {
    /** Nothing to release */
  }

  private static distance(
    p0: ParticleComponent,
    p1: ParticleComponent
  ): number {
    return Math.sqrt((p0.pos.x - p1.pos.x) ** 2 + (p0.pos.y - p1.pos.y) ** 2);
  }
}
