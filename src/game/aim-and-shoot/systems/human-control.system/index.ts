import type { World } from "miniplex";

import type { IUpdatable } from "../../../interfaces/updatable.interface";

import type { Entity, IQueries } from "../../entities";

export class HumanControlSystem implements IUpdatable {
  private controlState = {
    left: false,
    up: false,
    right: false,
    down: false,
  };

  constructor() {
    document.body.addEventListener("keydown", (e) => {
      switch (e.code) {
        case "KeyA":
        case "ArrowLeft":
          this.controlState.left = true;

          break;

        case "KeyW":
        case "ArrowUp":
          this.controlState.up = true;

          break;

        case "KeyD":
        case "ArrowRight":
          this.controlState.right = true;

          break;

        case "KeyS":
        case "ArrowDown":
          this.controlState.down = true;

          break;
      }
    });

    document.body.addEventListener("keyup", (e) => {
      e.preventDefault();

      switch (e.code) {
        case "KeyA":
        case "ArrowLeft":
          this.controlState.left = false;

          break;

        case "KeyW":
        case "ArrowUp":
          this.controlState.up = false;

          break;

        case "KeyD":
        case "ArrowRight":
          this.controlState.right = false;

          break;

        case "KeyS":
        case "ArrowDown":
          this.controlState.down = false;

          break;
      }
    });
  }

  public update(_: World<Entity>, queries: IQueries): void {
    for (const { warrior } of queries.humanPlayer) {
      warrior.isMoving.down = this.controlState.down;
      warrior.isMoving.left = this.controlState.left;
      warrior.isMoving.right = this.controlState.right;
      warrior.isMoving.up = this.controlState.up;
    }
  }
}
