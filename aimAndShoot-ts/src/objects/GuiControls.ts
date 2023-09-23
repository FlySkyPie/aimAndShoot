import { Constants } from "../constants";
// import { playerFacade } from "../facades/player-facade";
import { init, update } from "../main";
import { state } from "./state";

export class GuiControls {
  public main: HTMLDivElement;

  constructor() {
    document.body.addEventListener("touchstart", (e) => {
      e.preventDefault();
    });

    document.body.addEventListener("touchend", (e) => {
      e.preventDefault();
    });

    document.body.addEventListener("touchmove", (e) => {
      e.preventDefault();
    });

    this.main = document.createElement("div");

    this.main.id = "GuiControls";

    document.body.appendChild(this.main);

    const top = document.createElement("div");

    top.appendChild(this.createFire());

    top.appendChild(this.createFire());

    this.main.appendChild(top);

    const bottom = document.createElement("div");

    const directional = this.createDirectional();

    bottom.appendChild(directional);

    const lookAt = this.createLookAt();

    bottom.appendChild(lookAt);

    this.main.appendChild(bottom);
  }

  createCanvas(size: number) {
    const canvas = document.createElement("canvas");

    canvas.width = size || 128;

    canvas.height = size || 128;

    const cd = canvas.getContext("2d")!;

    cd.beginPath();

    cd.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);

    cd.fillStyle = "rgba(0,0,0,0.3)";

    cd.fill();

    return canvas;
  }

  createDirectional() {
    const directional = this.createCanvas(128);

    const notMove = function () {
      state.player.isMoving.right = false;
      state.player.isMoving.left = false;
      state.player.isMoving.up = false;
      state.player.isMoving.down = false;
    };

    const move = function (e: TouchEvent) {
      e.preventDefault();

      const rect = directional.getBoundingClientRect(),
        _x = directional.width / rect.width,
        _y = directional.height / rect.height;

      let x = (e.targetTouches[0].pageX - rect.left) * _x;

      let y = (e.targetTouches[0].pageY - rect.top) * _y;

      if (x > 64) state.player.isMoving.right = true;
      else state.player.isMoving.left = true;

      if (y < 64) state.player.isMoving.up = true;
      else state.player.isMoving.down = true;
    };

    directional.addEventListener("touchstart", (e) => {
      move(e);
    });

    directional.addEventListener("touchmove", (e) => {
      notMove();

      move(e);
    });

    directional.addEventListener("touchend", (e) => {
      notMove();
    });

    return directional;
  }

  createLookAt() {
    const look = this.createCanvas(128);

    look.addEventListener("touchmove", (e) => {
      e.preventDefault();

      const rect = look.getBoundingClientRect(),
        _x = look.width / rect.width,
        _y = look.height / rect.height;

      let x = (e.targetTouches[0].pageX - rect.left) * _x;
      let y = (e.targetTouches[0].pageY - rect.top) * _y;

      state.player.lookAt(
        (x / 128) * Constants.w * 2 - Constants.w2,
        (y / 128) * Constants.h * 2 - Constants.h2
      );
    });

    return look;
  }

  createFire() {
    const btn = this.createCanvas(64);

    btn.addEventListener("touchstart", (e) => {
      e.preventDefault();

      if (state.isGameover) {
        init();

        return;
      }

      if (state.isStarting) {
        state.isStarting = false;

        update();

        return;
      }

      state.player.isShooting = true;
    });

    btn.addEventListener("touchend", (e) => {
      state.player.isShooting = false;
    });

    return btn;
  }
}
