import { Howl } from "howler";

import type { IFacade } from "../interfaces/facade.interface";
import gunSfxUrl from "../assets/gun-sfx/Air-rifle-gun-shot.mp3";
import { Player } from "../objects/Player";
import { Genetics } from "../objects/Genetics";

export class MainFacade implements IFacade {
  public artwork = new Image();
  public canvas = document.createElement("canvas");
  public rect = null;
  public _x = 0;
  public _y = 0;
  public c: CanvasRenderingContext2D;
  public genetics: Genetics;
  public enemies: Player[] = [];
  public player: Player;
  public bullets = [];
  public players = [];
  public isGameover = false;
  public u = 0;
  public generation = 1;
  public isStarting = true;

  public sound = new Howl({
    src: [gunSfxUrl],
    volume: 0.3,
  });

  constructor() {
    this.player = new Player(this);
    this.genetics = new Genetics(this);
    this.genetics.createPopulation();
    this.enemies = this.genetics.population.slice();
    this.c = this.canvas.getContext("2d")!;
  }
}
