import type { AttackEffectComponent } from "../components/attack-effect";
import type { HealthComponent } from "../components/health";
import type { ParticleComponent } from "../components/particle";
import type { ProjectileEmitterComponent } from "../components/projectile-emitter";
import type { TimeComponent } from "../components/time";
import type { WarriorMiscComponent } from "../components/warrior-misc";

export type TimeEntity = {
  timeComponent: TimeComponent;
};

export type AgentEntity = {
  name: string;
  particle: ParticleComponent;
  health: HealthComponent;
  projectileEmitter: ProjectileEmitterComponent;
  warrior: WarriorMiscComponent;
};

export type BulletEntity = {
  particle: ParticleComponent;
  attackEffect: AttackEffectComponent;
};

export type Entity = Partial<TimeEntity> &
  Partial<AgentEntity> &
  Partial<BulletEntity>;
