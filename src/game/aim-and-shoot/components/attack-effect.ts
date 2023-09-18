export interface AttackEffectComponent {
  speed: number;
  damage: number;
  isGone: boolean;

  /**
   * Agent targets.
   */
  targets: number[];

  /**
   * Agent owner.
   */
  owner: number;
}
