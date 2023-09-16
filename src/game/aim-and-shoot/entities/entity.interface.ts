import type { AttackEffectComponent } from "../components/attack-effect";
import type { ParticleComponent } from "../components/particle";
import type { TimeComponent } from "../components/time";

export type TimeEntity = {
  timeComponent: TimeComponent;
};

export type PlayerEntity = {
  name: string;
  particle: ParticleComponent;
  health: { current: number; max: number };
};

export type BulletEntity = {
  particle: ParticleComponent;
  attackEffect: AttackEffectComponent;
};

export type Entity = Partial<TimeEntity> &
  Partial<PlayerEntity> &
  Partial<BulletEntity>;
