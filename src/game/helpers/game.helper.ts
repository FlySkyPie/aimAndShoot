import type { World } from "miniplex";

import type { Entity } from "../aim-and-shoot/entities";

export abstract class GameHelper {
  public static createQueries(world: World<Entity>) {
    const playerBase = world.with(
      "particle",
      "health",
      "projectileEmitter",
      "warrior",
      "statistics"
    );
    return {
      Time: world.with("timeComponent"),
      Event: world.with("eventQueue", "events"),
      bullet: world.with("particle", "attackEffect"),
      player: playerBase.with("id"),
      humanPlayer: playerBase.without("brain"),
      botPlayer: playerBase.with("brain"),
    };
  }
}
