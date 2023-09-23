import type { World } from "miniplex";

import type { IUpdatable, IDisposable } from "../../../interfaces";

import type { Entity, IQueries } from "../../entities";
import { Constants } from "../../constants";

export class HumanControlSystem implements IUpdatable, IDisposable {
  private controlState = {
    left: false,
    up: false,
    right: false,
    down: false,
  };

  private looking = { x: 0, y: 0 };

  private isShooting = false;

  constructor(private canvas: HTMLCanvasElement) {
    document.body.addEventListener("keydown", this.handleKeydown);
    document.body.addEventListener("keyup", this.handleKeyup);
    this.canvas.addEventListener("mousemove", this.handleMousemove);
    this.canvas.addEventListener("mouseup", this.handleMouseup);
    this.canvas.addEventListener("mousedown", this.handleMousedown);
    this.canvas.addEventListener("contextmenu", this.handleContextMenu);
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

  public dispose(): void {
    document.body.removeEventListener("keydown", this.handleKeydown);
    document.body.removeEventListener("keyup", this.handleKeyup);
    this.canvas.removeEventListener("mousemove", this.handleMousemove);
    this.canvas.removeEventListener("mouseup", this.handleMouseup);
    this.canvas.removeEventListener("mousedown", this.handleMousedown);
    this.canvas.removeEventListener("contextmenu", this.handleContextMenu);
  }

  private handleKeydown = (e: KeyboardEvent) => {
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
  };

  private handleKeyup = (e: KeyboardEvent) => {
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
  };

  private handleMousemove = (e: MouseEvent) => {
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    this.looking.x = (x * Constants.w) / rect.width;
    this.looking.y = (y * Constants.h) / rect.height;
  };

  private handleMouseup = (e: MouseEvent) => {
    e.preventDefault();
    this.isShooting = false;
  };

  private handleMousedown = (e: MouseEvent) => {
    e.preventDefault();
    this.isShooting = true;
  };

  private handleContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    // return false;
  };
}
