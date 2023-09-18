import type { World } from "miniplex";

import type { IUpdatable } from "../../../interfaces/updatable.interface";

import type { AgentEntity, Entity, IQueries } from "../../entities";
import { EntityFactory } from "../../utilities/entity-factory";
import { Constants } from "../../constants";

/**
 * @dependency Dependencies:
 * - `InitialCombatEvent`
 * @sideEffect Side Effects:
 * - Remove and create `AgentEntity`
 */
export class CombatSetupSystem implements IUpdatable {
  update(world: World<Entity>, queries: IQueries): void {
    let allDead = queries.botPlayer.size === 0 ? false : true;
    for (const { warrior } of queries.botPlayer) {
      if (!warrior.isDead) {
        allDead = false;

        break;
      }
    }
    const { events, eventQueue } = queries.Event.first!;
    if (allDead) {
      eventQueue.push({ type: "initial-combat" });
    }

    const initialEvents = events.filter(
      ({ type }) => type === "initial-combat"
    );
    if (initialEvents.length !== 0) {
      for (const player of queries.player) {
        world.remove(player);
      }

      for (const player of queries.bullet) {
        world.remove(player);
      }

      world.add<AgentEntity>(EntityFactory.createAgent());
      for (let i = 0; i < Constants.maxEnemies; i++) {
        world.add<AgentEntity>(EntityFactory.createBotAgent());
      }
    }
  }
}
