import type { With, World } from "miniplex";

import type { IUpdatable, IDisposable } from "../../../interfaces";

import type { AgentEntity, Entity, IQueries } from "../../entities";
import { EntityFactory } from "../../utilities/entity-factory";
import { Constants } from "../../constants";
import { TimeComponent } from "../../components";

type IQueryAgent = With<
  Partial<Entity>,
  | "particle"
  | "health"
  | "projectileEmitter"
  | "warrior"
  | "brain"
  | "statistics"
>;

type IScore = {
  id: string;
  name: string;
  color: string;
  hitRate: number;
};

/**
 * @dependency Dependencies:
 * - `InitialCombatEvent`
 * @sideEffect Side Effects:
 * - Remove and create `AgentEntity`
 */
export class CombatSetupSystem implements IUpdatable, IDisposable {
  public update(world: World<Entity>, queries: IQueries): void {
    const { timeComponent } = queries.Time.first!;
    const { events, eventQueue } = queries.Event.first!;

    const initialEvents = events.filter(
      ({ type }) => type === "initial-combat"
    );
    const playerDeadEvents = events.filter(
      (event) => event.type === "agent-dead" && !event.payload.isBot
    );
    if (initialEvents.length !== 0 || playerDeadEvents.length !== 0) {
      for (const bullet of queries.bullet) {
        world.remove(bullet);
      }

      for (const player of queries.player) {
        world.remove(player);
      }

      world.add<AgentEntity>(EntityFactory.createAgent());
      for (let i = 0; i < Constants.maxEnemies; i++) {
        world.add<AgentEntity>(EntityFactory.createBotAgent());
      }
      timeComponent.generation = 1;

      eventQueue.push({
        type: "combat-started",
        payload: {
          generation: timeComponent.generation,
          agents: queries.player.entities.map(
            ({ id, warrior: { name, color } }) => ({
              id,
              name: name,
              color: `rgb(${color[0]},${color[1]},${color[2]})`,
            })
          ),
        },
      });
    }

    const evolveEvents = events.filter(({ type }) => type === "evolve-combat");
    let allDead = queries.botPlayer.size === 0 ? false : true;
    for (const { warrior } of queries.botPlayer) {
      if (!warrior.isDead) {
        allDead = false;

        break;
      }
    }
    if (evolveEvents.length !== 0) {
      this.handleEvolveCombatEvent(world, queries, timeComponent);
      timeComponent.generation += 1;

      eventQueue.push({
        type: "combat-started",
        payload: {
          generation: timeComponent.generation,
          agents: queries.player.entities.map(
            ({ id, warrior: { name, color } }) => ({
              id,
              name: name,
              color: `rgb(${color[0]},${color[1]},${color[2]})`,
            })
          ),
        },
      });
    } else {
      if (allDead) {
        eventQueue.push({ type: "evolve-combat" });
        const payload: IScore[] = [];
        for (const {
          id,
          warrior: { name, color },
          statistics,
        } of queries.player) {
          payload.push({
            id,
            name: name,
            color: `rgb(${color[0]},${color[1]},${color[2]})`,
            hitRate: this.divide(statistics.hits, statistics.shootsFired),
          });
        }
        eventQueue.push({ type: "combat-statistics", payload });
      }
    }
  }

  public dispose(): void {
    /** Nothing to release */
  }

  private handleEvolveCombatEvent(
    world: World<Entity>,
    queries: IQueries,
    timeComponent: TimeComponent
  ): void {
    for (const bullet of queries.bullet) {
      world.remove(bullet);
    }

    this.evaluate(queries, timeComponent);

    const newPopulation: AgentEntity[] = [];
    for (let i = 0; i < queries.botPlayer.size; i++) {
      const a = this.selectParent(queries);
      const b = this.selectParent(queries);
      const child = this.crossOver(a, b);
      if (Math.random() < 0.25) {
        this.mutate(child);
      }
      newPopulation.push(child);
    }
    for (const player of queries.player) {
      world.remove(player);
    }

    world.add<AgentEntity>(EntityFactory.createAgent());
    for (const bot of newPopulation) {
      world.add<AgentEntity>(bot);
    }
  }

  private mutate(child: IQueryAgent) {
    for (let i = 0, end = Math.floor(Math.random() * 3); i < end; i++) {
      child.warrior.color[Math.floor(Math.random() * 3)] = Math.floor(
        Math.random() * 256
      );
    }

    const what = Math.random() > 0.5 ? "bias" : "weights";

    for (let i = 0; i < child.brain!.layers.length; i++) {
      for (let j = 0; j < child.brain!.layers[i][what].data.length; j += 2) {
        child.brain.layers[i][what].data[j] = Math.random() * 2 - 1;
      }
    }

    return child;
  }

  private crossOver(a: IQueryAgent | null, b: IQueryAgent | null) {
    if (!a) {
      a = EntityFactory.createBotAgent();
    }

    if (!b) {
      b = EntityFactory.createBotAgent();
    }

    const color: [number, number, number] = [0, 0, 0];

    for (let i = 0; i < color.length; i++) {
      if (Math.random() < 0.5)
        color[i] = (a.warrior.color[i] + b.warrior.color[i]) / 2;
      else
        color[i] =
          Math.random() < 0.5 ? a.warrior.color[i] : b.warrior.color[i];
    }

    const child = EntityFactory.createBotAgent();

    for (let i = 0; i < child.brain.layers.length; i++) {
      for (let j = 0; j < child.brain.layers[i].bias.data.length; j++) {
        if (!(j % 2))
          child.brain.layers[i].bias.data[j] = a.brain!.layers[i].bias.data[j];
        else
          child.brain.layers[i].bias.data[j] = b.brain!.layers[i].bias.data[j];
      }

      for (let j = 0; j < child.brain.layers[i].weights.data.length; j++) {
        if (j % 2)
          child.brain.layers[i].weights.data[j] =
            a.brain!.layers[i].weights.data[j];
        else
          child.brain.layers[i].weights.data[j] =
            b.brain!.layers[i].weights.data[j];
      }
    }

    return child;
  }

  /**
   * Weighted Randomly pick a bot.
   */
  private selectParent(queries: IQueries) {
    let total = 0;

    for (const bot of queries.botPlayer) {
      total += bot.statistics.fitness;
    }

    let prob = Math.random() * total;

    for (const bot of queries.botPlayer) {
      if (prob < bot.statistics.fitness) {
        return bot;
      }

      prob -= bot.statistics.fitness;
    }

    return null;
  }

  /**
   * Calculate fitness for bot agents.
   */
  private evaluate(queries: IQueries, timeComponent: TimeComponent) {
    let totalBulletsFired = 0;

    for (const player of queries.player) {
      totalBulletsFired += player.statistics.shootsFired;
    }

    for (const bot of queries.botPlayer) {
      const agressive = this.divide(
        bot.statistics.shootsFired,
        totalBulletsFired
      );
      const survial = this.divide(bot.statistics.age, timeComponent.totalTime);
      const hits = this.divide(bot.statistics.hits, bot.statistics.shootsFired);
      const friendlyFire = this.divide(
        bot.statistics.friendlyFire,
        bot.statistics.shootsFired
      );
      const selfInjury = this.divide(bot.statistics.selfInjury, 40);

      bot.statistics.fitness += agressive * 0.23;
      bot.statistics.fitness += survial * 0.02;
      bot.statistics.fitness += hits * 0.55;
      bot.statistics.fitness -= friendlyFire * 0.08;
      bot.statistics.fitness -= selfInjury * 0.12;
      bot.statistics.fitness *= bot.statistics.move / 100;
      bot.statistics.fitness = Math.max(0, bot.statistics.fitness);
    }
  }

  private divide(a: number, b: number) {
    if (b == 0) return 0;

    return a / b;
  }
}
