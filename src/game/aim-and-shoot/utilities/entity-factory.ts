import { nanoid } from "nanoid";

import type { AgentEntity } from "../entities";

export abstract class EntityFactory {
  public static createAgent(): AgentEntity {
    return {
      id: nanoid(),
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
    };
  }
}
