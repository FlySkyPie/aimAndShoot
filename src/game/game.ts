import { World } from "miniplex";

import type { IUpdatable } from "./interfaces/updatable.interface";
import type {
  AgentEntity,
  BulletEntity,
  Entity,
  IQueries,
  TimeEntity,
} from "./aim-and-shoot/entities";
import { RenderSystem } from "./aim-and-shoot/systems/render.system";
import { MovementSystem } from "./aim-and-shoot/systems/movement.system";
import { TimeTickSystem } from "./aim-and-shoot/systems/time-tick.system";
import { PoolCleanSystem } from "./aim-and-shoot/systems/pool-clean-system";
import { HumanControlSystem } from "./aim-and-shoot/systems/human-control.system";
import { PostTimeTickSystem } from "./aim-and-shoot/systems/post-time-tick.system";

export class Game {
  private animationId: number = NaN;

  private systems: IUpdatable[] = [];

  private world: World<Entity>;

  private queries: IQueries;

  constructor(canvas: HTMLCanvasElement) {
    this.systems = [
      new TimeTickSystem(),
      new HumanControlSystem(),
      new MovementSystem(),
      new RenderSystem(canvas),
      new PoolCleanSystem(),
      new PostTimeTickSystem(),
    ];

    this.world = new World<Entity>();
    this.queries = {
      Time: this.world.with("timeComponent"),
      bullet: this.world.with("particle", "attackEffect"),
      player: this.world.with(
        "particle",
        "health",
        "projectileEmitter",
        "warrior",
        "statistics"
      ),
      humanPlayer: this.world
        .with(
          "particle",
          "health",
          "projectileEmitter",
          "warrior",
          "statistics"
        )
        .without("brain"),
    };

    this.init();
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

  private init() {
    this.world.add<TimeEntity>({
      timeComponent: {
        prevTime: Date.now(),
        nextTime: Date.now(),
        deltaTime: Date.now(),
        startTime: Date.now(),
        totalTime: 0,
      },
    });

    /**
     * Used for test.
     */
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

    this.world.add<AgentEntity>({
      name: "Test",
      particle: {
        angle: Math.PI * 0.25,
        pos: { x: 512, y: 512 },
        size: 30,
      },
      health: {
        current: 10,
        max: 10,
      },
      projectileEmitter: {
        coolDownInit: 20,
        coolDown: 20,
        spreadInit: 5,
        spread: 5,
      },
      warrior: {
        color: [0, 0, 0],
        looking: { x: 0, y: 0 },
        isMoving: {
          left: false,
          up: false,
          right: false,
          down: false,
        },
        isShooting: false,
        velocity: 0.01,
        speed: { x: 0, y: 0 },
        friction: 0.97,
        isDead: false,
        iAnim: 0,
      },
      statistics: {
        age: 0,
        fitness: 0,
        friendlyFire: 0,
        hits: 0,
        move: 0,
        selfInjury: 0,
        shootsFired: 0,
      },
    });
  }
}
