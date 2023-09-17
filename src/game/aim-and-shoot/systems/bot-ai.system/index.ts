import type { World } from "miniplex";

import type { IUpdatable } from "../../../interfaces/updatable.interface";

import type { Entity, IQueries } from "../../entities";
import { Constants } from "../../constants";

export class BotAISystem implements IUpdatable {
  public update(_: World<Entity>, queries: IQueries): void {
    for (const { id, brain, warrior } of queries.botPlayer) {
      const data = Array(6 * Constants.maxEnemies).fill(0);

      let i = 0;

      for (const player of queries.player) {
        if (player.id === id) {
          continue;
        }
        data[i * 5 + 0] = player.warrior.isDead
          ? 0
          : player.particle.pos.x / Constants.w;

        data[i * 5 + 1] = player.warrior.isDead
          ? 0
          : player.particle.pos.y / Constants.h;

        data[i * 5 + 2] = player.warrior.isDead
          ? 0
          : player.warrior.looking.x / Constants.w;

        data[i * 5 + 3] = player.warrior.isDead
          ? 0
          : player.warrior.looking.y / Constants.h;

        data[i * 5 + 4] = player.warrior.isDead
          ? 0
          : player.warrior.isShooting
          ? 1
          : 0;

        data[i * 5 + 5] = player.warrior.isDead
          ? 0
          : player.brain !== undefined
          ? 1
          : 0;

        i++;
      }

      // let t = 0,
      //   i = 0;

      // while (t < Constants.maxEnemies) {
      //   t++;

      //   if (this.facade.players[i] === this) continue;

      //   i++;
      // }

      const action = brain.predict(data).data!;

      action[0] > 0.5
        ? (warrior.isMoving.left = true)
        : (warrior.isMoving.left = false);

      action[1] > 0.5
        ? (warrior.isMoving.up = true)
        : (warrior.isMoving.up = false);

      action[2] > 0.5
        ? (warrior.isMoving.right = true)
        : (warrior.isMoving.right = false);

      action[3] > 0.5
        ? (warrior.isMoving.down = true)
        : (warrior.isMoving.down = false);

      warrior.looking.x = action[4] * Constants.w;

      warrior.looking.y = action[5] * Constants.h;

      action[6] > 0.5
        ? (warrior.isShooting = true)
        : (warrior.isShooting = false);
    }
  }
}
