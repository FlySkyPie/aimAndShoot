export interface AttackEffectComponent {
  speed: number;
  damage: number;
  isGone: boolean;

  /**
   * Agent targets.
   */
  targets: string[];

  /**
   * Agent owner.
   */
  owner: string;
}
