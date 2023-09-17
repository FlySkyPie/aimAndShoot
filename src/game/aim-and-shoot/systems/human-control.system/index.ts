import type { World } from "miniplex";

import type { IUpdatable } from "../../../interfaces/updatable.interface";

import type { Entity, IQueries } from "../../entities";
import { Constants } from "../../constants";

export class HumanControlSystem implements IUpdatable {
  private controlState = {
    left: false,
    up: false,
    right: false,
    down: false,
  };

  private looking = { x: 0, y: 0 };

  private isShooting = false;

  constructor(private canvas: HTMLCanvasElement) {
    this.addEventsListeners();
  }

  public update(_: World<Entity>, queries: IQueries): void {
    for (const { warrior } of queries.humanPlayer) {
      warrior.isMoving.down = this.controlState.down;
      warrior.isMoving.left = this.controlState.left;
      warrior.isMoving.right = this.controlState.right;
      warrior.isMoving.up = this.controlState.up;

      warrior.looking.x = this.looking.x;
      warrior.looking.y = this.looking.y;

      warrior.isShooting = this.isShooting;
    }
  }

  private addEventsListeners() {
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

    this.canvas.addEventListener("mousemove", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      this.looking.x = (x * Constants.w) / rect.width;
      this.looking.y = (y * Constants.h) / rect.height;
    });

    this.canvas.addEventListener("mouseup", (e) => {
      e.preventDefault();
      this.isShooting = false;
    });

    this.canvas.addEventListener("mousedown", (e) => {
      e.preventDefault();
      this.isShooting = true;
    });
  }
}
