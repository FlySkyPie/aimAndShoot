export interface IPlayerEntity {
  pos: { x: number; y: number };
  health: number;
  angle: number;
  ai: boolean;
  color: [r: number, g: number, b: number];
  size: number;
  looking: { x: number; y: number };
  isMoving: {
    left: boolean;
    up: boolean;
    right: boolean;
    down: boolean;
  };
  isShooting: boolean;
  velocity: number;
  speed: { x: number; y: number };
  friction: number;
  isDead: boolean;

  /**
   * Max value of weapon ammunation.
   */
  coolDownInit: number;
  /**
   * Current value of weapon ammunation.
   */
  coolDown: number;

  spreadInit: number;
  spread: number;
  iAnim: number;
  shootsFired: number;
  hits: number;
  friendlyFire: number;
  age: number;
  fitness: number;
  selfInjury: number;
  move: number;
}
