import type { IFacade } from "../interfaces/facade.interface";
import type { Player } from "./Player";
import { Constants } from "../constants";
import { timeFacade } from "../facades/time-facade";

// import { state } from "./state";

export class Bullet {
  public pos: { x: number; y: number };

  public size: number;
  public angle: number;
  public speed: number;
  public damage: number;
  public isGone: boolean = false;
  public targets: Player[];

  constructor(
    private facade: IFacade,
    public owner: Player,
    x: number,
    y: number,
    size: number,
    angle: number,
    speed: number,
    damage: number,
    targets: Player[] = []
  ) {
    this.pos = { x: x || 0, y: y || 0 };
    this.owner = owner || null;
    this.size = size || 5;
    this.angle = angle || 0;
    this.speed = speed || 0;
    this.damage = damage || 1;
    this.targets = targets;
  }

  public update() {
    if (this.isGone) return;

    if (
      this.pos.x < -this.size ||
      this.pos.y < -this.size ||
      this.pos.x > Constants.w + this.size ||
      this.pos.y > Constants.h + this.size
    ) {
      this.isGone = true;

      return;
    }

    this.pos.x += Math.cos(this.angle) * this.speed * timeFacade.deltaTime;

    this.pos.y += Math.sin(this.angle) * this.speed * timeFacade.deltaTime;

    for (let i = this.targets.length - 1; i >= 0; i--) {
      if (this.targets[i].isDead) continue;

      if (this.distance(this.targets[i]) < this.targets[i].size + this.size) {
        if (this.owner.ai !== this.targets[i].ai) this.owner.hits++;
        else this.owner.friendlyFire++;

        this.targets[i].speed.x += Math.cos(this.angle) * 0.1;

        this.targets[i].speed.y += Math.sin(this.angle) * 0.1;

        this.targets[i].health -= this.damage;

        this.isGone = true;

        break;
      }
    }
  }

  public distance(target: Player) {
    return (
      Math.abs(this.pos.x - target.pos.x) + Math.abs(this.pos.y - target.pos.y)
    );
  }

  public show() {
    this.facade.c.fillStyle = "black";
    this.facade.c.beginPath();
    this.facade.c.arc(this.pos.x, this.pos.y, this.size, 0, Constants.TWOPI);
    this.facade.c.fill();
  }
}
