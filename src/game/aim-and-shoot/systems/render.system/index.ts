import type { World } from "miniplex";

import type { IUpdatable, IDisposable } from "../../../interfaces";

import type { Entity, IQueries } from "../../entities";
import type { ParticleComponent } from "../../components/particle";
import { Constants } from "../../constants";
import { HealthComponent } from "../../components/health";
import { ProjectileEmitterComponent } from "../../components/projectile-emitter";
import { WarriorMiscComponent } from "../../components/warrior-misc";

export class RenderSystem implements IUpdatable,IDisposable {
  private ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext("2d")!;
  }

  public update(_: World<Entity>, queries: IQueries): void {
    this.ctx.clearRect(0, 0, Constants.w, Constants.h);

    for (const { particle } of queries.bullet) {
      this.renderBullet(particle);
    }

    for (const {
      particle,
      health,
      projectileEmitter,
      warrior,
    } of queries.player) {
      this.renderPlayer(particle, health, projectileEmitter, warrior);
    }
  }

  public dispose(): void {
     /** Nothing to release */
  }

  private renderBullet(particle: ParticleComponent) {
    this.ctx.fillStyle = "black";
    this.ctx.beginPath();
    this.ctx.arc(
      particle.pos.x,
      particle.pos.y,
      particle.size,
      0,
      Constants.TWOPI
    );
    this.ctx.fill();
  }

  private renderPlayer(
    particle: ParticleComponent,
    health: HealthComponent,
    projectileEmitter: ProjectileEmitterComponent,
    warrior: WarriorMiscComponent
  ) {
    if (warrior.isDead) {
      warrior.iAnim += 0.1;

      this.ctx.fillStyle =
        "rgba(" +
        warrior.color[0] +
        "," +
        warrior.color[1] +
        "," +
        warrior.color[2] +
        "," +
        (1 - warrior.iAnim) +
        ")";

      this.ctx.beginPath();
      this.ctx.arc(
        particle.pos.x,
        particle.pos.y,
        particle.size,
        0,
        Constants.TWOPI
      );
      this.ctx.fill();
      this.ctx.save();

      this.ctx.translate(particle.pos.x, particle.pos.y);
      this.ctx.rotate(particle.angle + warrior.iAnim);
      this.ctx.fillRect(warrior.iAnim * 50, -9, 50, 18);
      this.ctx.restore();

      return;
    }

    this.renderHealthBar(particle, health);
    this.renderCooldownBar(particle, projectileEmitter);

    this.ctx.fillStyle =
      "rgb(" +
      warrior.color[0] +
      "," +
      warrior.color[1] +
      "," +
      warrior.color[2] +
      ")";

    this.ctx.shadowColor = "black";
    this.ctx.shadowBlur = 5;
    this.ctx.save();

    this.ctx.translate(particle.pos.x, particle.pos.y);
    this.ctx.rotate(particle.angle);
    this.ctx.fillRect(0, -9, 50, 18);
    this.ctx.restore();

    this.ctx.beginPath();
    this.ctx.arc(
      particle.pos.x,
      particle.pos.y,
      particle.size,
      0,
      Constants.TWOPI
    );
    this.ctx.fill();
    this.ctx.shadowBlur = 0;
  }

  private renderHealthBar(
    particle: ParticleComponent,
    health: HealthComponent
  ) {
    this.ctx.fillStyle = "red";

    this.ctx.fillRect(
      particle.pos.x - 50,
      particle.pos.y - 60,
      health.current * 10,
      10
    );

    this.ctx.strokeRect(particle.pos.x - 50, particle.pos.y - 60, 100, 10);
  }

  private renderCooldownBar(
    particle: ParticleComponent,
    projectileEmitter: ProjectileEmitterComponent
  ) {
    this.ctx.fillStyle = "green";

    this.ctx.fillRect(
      particle.pos.x - 50,
      particle.pos.y - 45,
      Math.max(
        0,
        (projectileEmitter.coolDown / projectileEmitter.coolDownInit) * 100
      ),
      10
    );

    this.ctx.strokeRect(particle.pos.x - 50, particle.pos.y - 45, 100, 10);
  }
}
