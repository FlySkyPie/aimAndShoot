import type { World } from "miniplex";

import type { IUpdatable } from "../../../interfaces/updatable.interface";

import type { Entity, IQueries } from "../../entities";
import type { ParticleComponent } from "../../components/particle";
import { Constants } from "../../constants";

export class RenderSystem implements IUpdatable {
  private ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext("2d")!;
  }

  public update(_: World<Entity>, queries: IQueries): void {
    this.ctx.clearRect(0, 0, Constants.w, Constants.h);

    for (const { particle } of queries.bullet) {
      this.renderBullet(particle);
    }
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
}
