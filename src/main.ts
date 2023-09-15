import { Constants } from "./constants";
import { timeFacade } from "./facades/time-facade";
import { GuiControls } from "./objects/GuiControls";
import { state } from "./objects/state";
import { RenderUtils } from "./utils/render.utils";

export const init = function () {
  const oldCanvas = document.querySelector("#game");
  if (oldCanvas) oldCanvas.remove();
  else addEventsListener();

  state.canvas.id = "game";
  state.canvas.width = 1366;
  state.canvas.height = 768;

  state.c = state.canvas.getContext("2d")!;
  state.c.font = "25px Arial";
  state.c.textAlign = "center";

  document.body.appendChild(state.canvas);

  state.rect = state.canvas.getBoundingClientRect();
  state._x = Constants.w / state.rect.width;
  state._y = Constants.h / state.rect.height;

  state.players = [state.player, ...state.enemies];

  if (state.isStarting) {
    startScreen();
  } else {
    update();
  }
};

export const update = function () {
  timeFacade.nextTime = Date.now();
  timeFacade.deltaTime = timeFacade.nextTime - timeFacade.prevTime;
  timeFacade.totalTime += timeFacade.deltaTime;

  for (let i = state.bullets.length - 1; i >= 0; i--) {
    state.bullets[i].update();

    if (state.bullets[i].isGone) state.bullets.splice(i, 1);
  }

  for (let i = state.players.length - 1; i >= 0; i--) {
    if (!state.players[i].isDead) state.players[i].update(state.player);
  }

  draw();

  if (state.player.isDead) {
    gameover();

    return;
  }

  let allDead = true;

  for (let i = 0; i < state.enemies.length; i++) {
    if (!state.enemies[i].isDead) {
      allDead = false;

      break;
    }
  }

  if (allDead) {
    endRound();

    return;
  }

  timeFacade.prevTime = timeFacade.nextTime;

  state.u = requestAnimationFrame(update);
};

const draw = function () {
  state.c.clearRect(0, 0, Constants.w, Constants.h);

  for (let i = 0; i < state.bullets.length; i++) {
    state.bullets[i].show();
  }

  for (let i = 0; i < state.players.length; i++) {
    RenderUtils.renderPlayer(state.c, state.players[i]);
  }

  state.c.textAlign = "start";

  state.c.fillStyle = "black";

  state.c.fillText("Generation: " + state.generation, 10, 30);

  state.c.textAlign = "center";
};

const endRound = function () {
  timeFacade.totalTime = (Date.now() - timeFacade.startTime) / 1000;

  state.genetics.evolve();

  state.enemies = state.genetics.population.slice();

  state.players = [state.player, ...state.enemies];

  timeFacade.startTime = Date.now();

  state.generation += 1;

  state.player.health = Math.min(
    10,
    state.player.health + state.player.health * 0.15
  );

  update();
};

const startScreen = function () {
  state.c.clearRect(0, 0, Constants.w, Constants.h);

  state.c.drawImage(
    state.artwork,
    0,
    0,
    state.artwork.width,
    state.artwork.height,
    0,
    0,
    Constants.w,
    Constants.h
  );

  state.c.fillStyle = "black";

  state.c.fillText(
    "Click to Start",
    Constants.w - Constants.w2 / 2,
    Constants.h2
  );
};

const gameover = function () {
  if (state.u) cancelAnimationFrame(state.u);

  state.generation = 1;

  let i = 0;

  const drawGameover = function () {
    state.c.fillStyle = "rgba(0,0,0," + (i += 0.01) + ")";

    state.c.fillRect(0, 0, Constants.w, Constants.h);

    state.c.fillStyle = "white";

    state.c.fillText(
      "You have failed the human race.",
      Constants.w2,
      Constants.h2 - 25
    );

    state.c.fillText(
      "You should move to mars or something.",
      Constants.w2,
      Constants.h2 + 25
    );

    if (i <= 1) {
      requestAnimationFrame(drawGameover);
    } else {
      state.c.fillText("Click to try again.", Constants.w2, Constants.h2 / 2);

      state.isGameover = true;
    }
  };

  drawGameover();
};

const addEventsListener = function () {
  document.body.addEventListener("mousemove", (e) => {
    state.player.lookAt(e.clientX * state._x, e.clientY * state._y);
  });

  document.body.addEventListener("keydown", (e) => {
    // e.preventDefault();

    switch (e.keyCode) {
      case 37:
      case 65:
        state.player.isMoving.left = true;

        break;

      case 38:
      case 87:
        state.player.isMoving.up = true;

        break;

      case 39:
      case 68:
        state.player.isMoving.right = true;

        break;

      case 40:
      case 83:
        state.player.isMoving.down = true;

        break;
    }
  });

  document.body.addEventListener("keyup", (e) => {
    e.preventDefault();

    switch (e.keyCode) {
      case 37:
      case 65:
        state.player.isMoving.left = false;

        break;

      case 38:
      case 87:
        state.player.isMoving.up = false;

        break;

      case 39:
      case 68:
        state.player.isMoving.right = false;

        break;

      case 40:
      case 83:
        state.player.isMoving.down = false;

        break;
    }
  });

  document.body.addEventListener("mouseup", (e) => {
    e.preventDefault();

    state.player.isShooting = false;
  });

  document.body.addEventListener("mousedown", (e) => {
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

  window.onresize = (_) => {
    if (state.u) cancelAnimationFrame(state.u);

    state.isStarting = true;

    init();
  };
};

state.artwork.src = "artwork.png";

state.artwork.onload = (_) => {
  init();

  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    const control = new GuiControls();
  }
};
