/**
 * I'm too lazy to design components for Agent (aka Player), put rest properties to here.
 */
export interface WarriorMiscComponent {
  name: string;
  color: [r: number, g: number, b: number];
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
  iAnim: number;
}
