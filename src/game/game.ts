import { World } from "miniplex";

import type { IUpdatable } from "./interfaces/updatable.interface";
import type {
  Entity,
  EventEntity,
  IQueries,
  TimeEntity,
} from "./aim-and-shoot/entities";
import { RenderSystem } from "./aim-and-shoot/systems/render.system";
import { MovementSystem } from "./aim-and-shoot/systems/movement.system";
import { TimeTickSystem } from "./aim-and-shoot/systems/time-tick.system";
import { PoolCleanSystem } from "./aim-and-shoot/systems/pool-clean-system";
import { HumanControlSystem } from "./aim-and-shoot/systems/human-control.system";
import { PostTimeTickSystem } from "./aim-and-shoot/systems/post-time-tick.system";
import { EventSystem } from "./aim-and-shoot/systems/event.system";
import { CombatSetupSystem } from "./aim-and-shoot/systems/combat-setup.system";

export class Game {
  private animationId: number = NaN;

  private systems: IUpdatable[] = [];

  private world: World<Entity>;

  private queries: IQueries;

  constructor(canvas: HTMLCanvasElement) {
    this.systems = [
      new EventSystem(),
      new TimeTickSystem(),
      new HumanControlSystem(canvas),
      new MovementSystem(),
      new RenderSystem(canvas),
      new PoolCleanSystem(),
      new CombatSetupSystem(),
      new PostTimeTickSystem(),
    ];

    this.world = new World<Entity>();
    this.queries = {
      Time: this.world.with("timeComponent"),
      Event: this.world.with("eventQueue", "events"),
      bullet: this.world.with("particle", "attackEffect"),
      player: this.world.with(
        "id",
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
      botPlayer: this.world.with(
        "particle",
        "health",
        "projectileEmitter",
        "warrior",
        "statistics",
        "brain"
      ),
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

    this.world.add<EventEntity>({
      eventQueue: [{ type: "initial-combat" }],
      events: [],
    });
  }
}
