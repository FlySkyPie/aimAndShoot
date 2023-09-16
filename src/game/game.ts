import { World } from "miniplex";

import type { IUpdatable } from "./interfaces/updatable.interface";
import type {
  BulletEntity,
  Entity,
  IQueries,
  TimeEntity,
} from "./aim-and-shoot/entities";
import { RenderSystem } from "./aim-and-shoot/systems/render.system";
import { MovementSystem } from "./aim-and-shoot/systems/movement.system";
import { TimeTickSystem } from "./aim-and-shoot/systems/time-tick.system";
import { PoolCleanSystem } from "./aim-and-shoot/systems/pool-clean-system";

export class Game {
  private animationId: number = NaN;

  private systems: IUpdatable[] = [];

  private world: World<Entity>;

  private queries: IQueries;

  constructor(canvas: HTMLCanvasElement) {
    this.systems = [
      new TimeTickSystem(),
      new MovementSystem(),
      new RenderSystem(canvas),
      new PoolCleanSystem(),
    ];

    this.world = new World<Entity>();
    this.queries = {
      Time: this.world.with("timeComponent"),
      bullet: this.world.with("particle", "attackEffect"),
    };

    this.world.add<TimeEntity>({
      timeComponent: {
        prevTime: Date.now(),
        nextTime: Date.now(),
        deltaTime: Date.now(),
        startTime: Date.now(),
        totalTime: 0,
      },
    });

    this.world.add<BulletEntity>({
      attackEffect: {
        damage: 1,
        isGone: false,
        owner: "N/A",
        speed: 1.2,
        targets: [],
      },
      particle: {
        angle: Math.PI * 0.25,
        pos: { x: 0, y: 0 },
        size: 5,
      },
    });
  }

  public start() {
    this.update();
  }

  public stop() {
    cancelAnimationFrame(this.animationId);
  }

  private update = () => {
    this.systems.forEach((item) => item.update(this.world, this.queries));
    this.animationId = requestAnimationFrame(this.update);
  };
}
