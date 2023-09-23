import { World } from "miniplex";

import type { IUpdatable, IDisposable } from "./interfaces";
import type { IGameEventMap } from "./interfaces/game-event-map";
import type {
  Entity,
  EventEntity,
  IQueries,
  TimeEntity,
} from "./aim-and-shoot/entities";
import { TypedEventEmitter } from "./utilities/typed-event-emitter";
import { GameHelper } from "./helpers/game.helper";
import {
  RenderSystem,
  MovementSystem,
  TimeTickSystem,
  PoolCleanSystem,
  HumanControlSystem,
  PostTimeTickSystem,
  EventSystem,
  CombatSetupSystem,
  BotAISystem,
  ProjectileSystem,
  DamageSystem,
  ExternalEventSystem,
  SoundEffectSystem,
} from "./aim-and-shoot/systems";

export class Game implements IDisposable {
  private isRunning = false;

  private animationId: number = NaN;

  private systems: (IUpdatable & IDisposable)[] = [];

  private world: World<Entity>;

  private queries: IQueries;

  private emitter: TypedEventEmitter<IGameEventMap>;

  constructor(canvas: HTMLCanvasElement) {
    this.emitter = new TypedEventEmitter();

    this.systems = [
      new EventSystem(),
      new TimeTickSystem(),
      new HumanControlSystem(canvas),
      new BotAISystem(),
      new MovementSystem(),
      new ProjectileSystem(),
      new DamageSystem(),
      new RenderSystem(canvas),
      new PoolCleanSystem(),
      new CombatSetupSystem(),
      new SoundEffectSystem(),
      new ExternalEventSystem(this.emitter),
      new PostTimeTickSystem(),
    ];

    this.world = new World<Entity>();
    this.queries = GameHelper.createQueries(this.world);

    this.init();
  }

  public dispose(): void {
    this.emitter.removeAllListeners();
    cancelAnimationFrame(this.animationId);
    if (this.isRunning) {
      this.isRunning = false;
      return;
    }
    this.systems.forEach((system) => system.dispose());
    this.systems.length = 0;
    this.world.clear();
  }

  public start() {
    this.isRunning = true;
    this.update();
  }

  public stop() {
    cancelAnimationFrame(this.animationId);
  }

  public on = <TEventName extends keyof IGameEventMap & string>(
    eventName: TEventName,
    handler: (...eventArg: IGameEventMap[TEventName]) => void
  ): void => {
    this.emitter.on(eventName, handler);
  };

  public off = <TEventName extends keyof IGameEventMap & string>(
    eventName: TEventName,
    handler: (...eventArg: IGameEventMap[TEventName]) => void
  ): void => {
    this.emitter.off(eventName, handler);
  };

  private update = () => {
    this.systems.forEach((item) => item.update(this.world, this.queries));
    if (!this.isRunning) {
      this.systems.forEach((system) => system.dispose());
      this.systems.length = 0;
      this.world.clear();
      return;
    }
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
        generation: 1,
      },
    });

    this.world.add<EventEntity>({
      eventQueue: [{ type: "initial-combat" }],
      events: [],
    });
  }
}
