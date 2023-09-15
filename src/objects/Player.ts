import { Constants } from "../constants";
import { timeFacade } from "../facades/time-facade";
import type { IFacade } from "../interfaces/facade.interface";
import { Bullet } from "./Bullet";
import { Dejavu } from "./Dejavu";

export class Player {
  public pos: { x: number; y: number };
  public health: number = 10;
  public angle: number;
  public ai: boolean;
  public color: [r: number, g: number, b: number];
  public size: number = 30;
  public looking: { x: number; y: number } = {
    x: Constants.w2,
    y: Constants.h2,
  };
  public isMoving = {
    left: false,
    up: false,
    right: false,
    down: false,
  };
  public isShooting: boolean = false;
  public velocity: number = 0.01;
  public speed: { x: number; y: number } = { x: 0, y: 0 };
  public friction: number = 0.97;
  public isDead: boolean = false;
  public coolDownInit: number = 20;
  public coolDown: number = 20;
  public spreadInit: number = 5;
  public spread: number = 5;
  public iAnim: number = 0;
  public shootsFired: number = 0;
  public hits: number = 0;
  public friendlyFire: number = 0;
  public age: number = 0;
  public fitness: number = 0;
  public selfInjury: number = 0;
  public move: number = 0;
  public brain?: Dejavu;

  constructor(
    private facade: IFacade,
    x?: number,
    y?: number,
    angle?: number,
    color?: [r: number, g: number, b: number],
    ai = false
  ) {
    this.pos = {
      x: x || Constants.w2,
      y: y || Constants.h2,
    };
    this.angle = angle || 0;
    this.ai = ai;
    this.color = color || [0, 0, 0];
  }

  public lookAt(x: number, y: number) {
    this.looking.x = x;

    this.looking.y = y;
  }

  public update(input: Player | null = null) {
    if (this.isDead) return;

    if (this.health <= 0) {
      this.isDead = true;

      this.age = (Date.now() - timeFacade.startTime) / 1000;

      return;
    }

    if (this.ai) this.updateAI(input);

    this.angle = Math.atan2(
      this.looking.y - this.pos.y,
      this.looking.x - this.pos.x
    );

    let moved = false;

    if (this.isMoving.left) {
      this.speed.x -= this.velocity;

      moved = true;
    }

    if (this.isMoving.up) {
      this.speed.y -= this.velocity;

      moved = true;
    }

    if (this.isMoving.right) {
      this.speed.x += this.velocity;

      moved = true;
    }

    if (this.isMoving.down) {
      this.speed.y += this.velocity;

      moved = true;
    }

    const _x = this.speed.x * timeFacade.deltaTime;

    const _y = this.speed.y * timeFacade.deltaTime;

    if (moved) this.move += 1;

    if (
      this.pos.x + _x > this.size &&
      this.pos.x + _x < Constants.w - this.size
    )
      this.pos.x += _x;
    else {
      this.speed.x = -this.speed.x;

      this.selfInjury += 1;

      this.health -= 0.25;
    }

    if (
      this.pos.y + _y > this.size &&
      this.pos.y + _y < Constants.h - this.size
    )
      this.pos.y += _y;
    else {
      this.speed.y = -this.speed.y;

      this.selfInjury += 1;

      this.health -= 0.25;
    }

    this.speed.x *= this.friction;

    this.speed.y *= this.friction;

    for (let i = 0; i < this.facade.players.length; i++) {
      if (this.facade.players[i] == this || this.facade.players[i].isDead)
        continue;

      if (
        this.distance(this.facade.players[i]) <=
        this.facade.players[i].size + this.size
      ) {
        this.facade.players[i].speed.x += this.speed.x;

        this.facade.players[i].speed.y += this.speed.y;

        this.speed.x += -this.facade.players[i].speed.x;

        this.speed.y += -this.facade.players[i].speed.y;

        this.speed.x *= 0.005;

        this.speed.y *= 0.005;
      }
    }

    if (this.isShooting && this.coolDown > 0 && this.spread < 1) {
      this.facade.sound.play();

      this.spread = this.spreadInit;

      this.coolDown -= 1;

      const targets = this.facade.players.slice(0);

      targets.splice(targets.indexOf(this), 1);

      this.facade.bullets.push(
        new Bullet(
          this.facade,
          this,
          this.pos.x + Math.cos(this.angle) * 40,
          this.pos.y + Math.sin(this.angle) * 40,
          5,
          this.angle,
          1.2,
          1,
          targets
        )
      );

      this.shootsFired++;
    }

    if (this.coolDown < this.coolDownInit && !this.isShooting)
      this.coolDown += 0.25;

    this.spread -= 1;
  }

  public distance(target: Player) {
    return Math.sqrt(
      (this.pos.x - target.pos.x) ** 2 + (this.pos.y - target.pos.y) ** 2
    );
  }

  public updateAI(target: any) {
    const data = Array(6 * Constants.maxEnemies).fill(0);

    let t = 0,
      i = 0;

    while (t < Constants.maxEnemies) {
      t++;

      if (this.facade.players[i] === this) continue;

      data[i * 5 + 0] = this.facade.players[i].isDead
        ? 0
        : this.facade.players[i].pos.x / Constants.w;

      data[i * 5 + 1] = this.facade.players[i].isDead
        ? 0
        : this.facade.players[i].pos.y / Constants.h;

      data[i * 5 + 2] = this.facade.players[i].isDead
        ? 0
        : this.facade.players[i].looking.x / Constants.w;

      data[i * 5 + 3] = this.facade.players[i].isDead
        ? 0
        : this.facade.players[i].looking.y / Constants.h;

      data[i * 5 + 4] = this.facade.players[i].isDead
        ? 0
        : this.facade.players[i].isShooting
        ? 1
        : 0;

      data[i * 5 + 5] = this.facade.players[i].isDead
        ? 0
        : this.facade.players[i].ai
        ? 1
        : 0;

      i++;
    }

    const action = this.brain?.predict(data).data!;

    action[0] > 0.5
      ? (this.isMoving.left = true)
      : (this.isMoving.left = false);

    action[1] > 0.5 ? (this.isMoving.up = true) : (this.isMoving.up = false);

    action[2] > 0.5
      ? (this.isMoving.right = true)
      : (this.isMoving.right = false);

    action[3] > 0.5
      ? (this.isMoving.down = true)
      : (this.isMoving.down = false);

    this.looking.x = action[4] * Constants.w;

    this.looking.y = action[5] * Constants.h;

    action[6] > 0.5 ? (this.isShooting = true) : (this.isShooting = false);
  }

  public showHealthBar() {
    this.facade.c.fillStyle = "red";

    this.facade.c.fillRect(
      this.pos.x - 50,
      this.pos.y - 60,
      this.health * 10,
      10
    );

    this.facade.c.strokeRect(this.pos.x - 50, this.pos.y - 60, 100, 10);
  }

  public showCooldownBar() {
    this.facade.c.fillStyle = "green";

    this.facade.c.fillRect(
      this.pos.x - 50,
      this.pos.y - 45,
      Math.max(0, (this.coolDown / this.coolDownInit) * 100),
      10
    );

    this.facade.c.strokeRect(this.pos.x - 50, this.pos.y - 45, 100, 10);
  }

  public show() {
    if (this.isDead) {
      this.iAnim += 0.1;

      this.facade.c.fillStyle =
        "rgba(" +
        this.color[0] +
        "," +
        this.color[1] +
        "," +
        this.color[2] +
        "," +
        (1 - this.iAnim) +
        ")";

      this.facade.c.beginPath();

      this.facade.c.arc(this.pos.x, this.pos.y, this.size, 0, Constants.TWOPI);

      this.facade.c.fill();

      this.facade.c.save();

      this.facade.c.translate(this.pos.x, this.pos.y);

      this.facade.c.rotate(this.angle + this.iAnim);

      this.facade.c.fillRect(this.iAnim * 50, -9, 50, 18);

      this.facade.c.restore();

      return;
    }

    this.showHealthBar();

    this.showCooldownBar();

    this.facade.c.fillStyle =
      "rgb(" + this.color[0] + "," + this.color[1] + "," + this.color[2] + ")";

    this.facade.c.shadowColor = "black";

    this.facade.c.shadowBlur = 5;

    this.facade.c.save();

    this.facade.c.translate(this.pos.x, this.pos.y);

    this.facade.c.rotate(this.angle);

    this.facade.c.fillRect(0, -9, 50, 18);

    this.facade.c.restore();

    this.facade.c.beginPath();

    this.facade.c.arc(this.pos.x, this.pos.y, this.size, 0, Constants.TWOPI);

    this.facade.c.fill();

    this.facade.c.shadowBlur = 0;
  }
}
