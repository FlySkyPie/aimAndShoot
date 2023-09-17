import type { World } from "miniplex";

import type { IUpdatable } from "../../../interfaces/updatable.interface";

import type { Entity, IQueries } from "../../entities";
import type { TimeComponent } from "../../components/time";
import type { ParticleComponent } from "../../components/particle";
import { Constants } from "../../constants";
import { WarriorMiscComponent } from "../../components/warrior-misc";
import { HealthComponent } from "../../components/health";
import { ProjectileEmitterComponent } from "../../components/projectile-emitter";
import { WarriorStatisticsComponent } from "../../components/warrior-statistics";

export class MovementSystem implements IUpdatable {
  update(world: World<Entity>, queries: IQueries): void {
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

    for (const {
      id,
      particle,
      warrior,
      health,
      projectileEmitter,
      statistics,
    } of queries.player) {
      this.updatePlayer(
        world,
        queries,
        timeComponent,
        particle,
        health,
        warrior,
        projectileEmitter,
        statistics,
        id
      );
    }
  }

  /**
   * Migrate all player update logics from original project.
   *
   * @todo Separate logics to other systems.
   */
  private updatePlayer(
    world: World<Entity>,
    queries: IQueries,
    timeComponent: TimeComponent,
    particle: ParticleComponent,
    health: HealthComponent,
    warrior: WarriorMiscComponent,
    projectileEmitter: ProjectileEmitterComponent,
    statistics: WarriorStatisticsComponent,
    id: string
  ) {
    const { eventQueue } = queries.Event.first!;
    if (warrior.isDead) return;

    if (health.current <= 0) {
      warrior.isDead = true;

      statistics.age = (Date.now() - timeComponent.startTime) / 1000;

      return;
    }

    // if (particle.ai) particle.updateAI();

    particle.angle = Math.atan2(
      warrior.looking.y - particle.pos.y,
      warrior.looking.x - particle.pos.x
    );

    let moved = false;

    if (warrior.isMoving.left) {
      warrior.speed.x -= warrior.velocity;

      moved = true;
    }

    if (warrior.isMoving.up) {
      warrior.speed.y -= warrior.velocity;

      moved = true;
    }

    if (warrior.isMoving.right) {
      warrior.speed.x += warrior.velocity;

      moved = true;
    }

    if (warrior.isMoving.down) {
      warrior.speed.y += warrior.velocity;

      moved = true;
    }

    const _x = warrior.speed.x * timeComponent.deltaTime;

    const _y = warrior.speed.y * timeComponent.deltaTime;

    if (moved) statistics.move += 1;

    if (
      particle.pos.x + _x > particle.size &&
      particle.pos.x + _x < Constants.w - particle.size
    )
      particle.pos.x += _x;
    else {
      warrior.speed.x = -warrior.speed.x;

      statistics.selfInjury += 1;

      health.current -= 0.25;
    }

    if (
      particle.pos.y + _y > particle.size &&
      particle.pos.y + _y < Constants.h - particle.size
    )
      particle.pos.y += _y;
    else {
      warrior.speed.y = -warrior.speed.y;

      statistics.selfInjury += 1;

      health.current -= 0.25;
    }

    warrior.speed.x *= warrior.friction;

    warrior.speed.y *= warrior.friction;

    // for (let i = 0; i < particle.facade.players.length; i++) {
    //   if (
    //     particle.facade.players[i] == particle ||
    //     particle.facade.players[i].isDead
    //   )
    //     continue;

    //   if (
    //     particle.distance(particle.facade.players[i]) <=
    //     particle.facade.players[i].size + particle.size
    //   ) {
    //     particle.facade.players[i].speed.x += particle.speed.x;

    //     particle.facade.players[i].speed.y += particle.speed.y;

    //     particle.speed.x += -particle.facade.players[i].speed.x;

    //     particle.speed.y += -particle.facade.players[i].speed.y;

    //     particle.speed.x *= 0.005;

    //     particle.speed.y *= 0.005;
    //   }
    // }

    const isTriggerFire =
      warrior.isShooting &&
      projectileEmitter.coolDown > 1 &&
      projectileEmitter.spread < 1;
    if (isTriggerFire) {
      // particle.facade.sound.play();

      projectileEmitter.spread = projectileEmitter.spreadInit;

      projectileEmitter.coolDown -= 1;

      world;

      // const targets = particle.facade.players.slice(0);
      // const targets: string[] = [];

      // targets.splice(targets.indexOf(particle), 1);

      eventQueue.push({
        type: "shoot-event",
        paylaod: {
          angle: particle.angle,
          ownerId: id,
          x: particle.pos.x,
          y: particle.pos.y,
        },
      });

      statistics.shootsFired++;
    }

    if (
      projectileEmitter.coolDown < projectileEmitter.coolDownInit &&
      !isTriggerFire
    )
      projectileEmitter.coolDown += 0.1;
    projectileEmitter.spread -= 1;
  }
}
