import { Bullet } from "../objects/Bullet";
import type { Genetics } from "../objects/Genetics";
import type { Player } from "../objects/Player";
import type { IPlayerFacade } from "./player-facade.interface";

export interface IFacade extends IPlayerFacade {
  artwork: HTMLImageElement;
  canvas: HTMLCanvasElement;
  rect: null | DOMRect;
  _x: number;
  _y: number;
  c: CanvasRenderingContext2D;
  // player: Player;
  players: Player[];
  bullets: Bullet[];
  isGameover: boolean;
  isStarting: boolean;
  generation: number;
  u: number;
  enemies: Player[];
  genetics: Genetics;
  aPlayer: HTMLAudioElement;
}
