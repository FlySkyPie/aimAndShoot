import type { AttackEffectComponent } from "../components/attack-effect";
import type { HealthComponent } from "../components/health";
import type { ParticleComponent } from "../components/particle";
import type { ProjectileEmitterComponent } from "../components/projectile-emitter";
import type { TimeComponent } from "../components/time";
import type { WarriorMiscComponent } from "../components/warrior-misc";
import type { WarriorStatisticsComponent } from "../components/warrior-statistics";
import type { DejavuComponent } from "../components/dejavu/dejavu";
import type { GameEvent } from "../events";

export type EventEntity = {
  eventQueue: GameEvent[];
  events: GameEvent[];
};

export type TimeEntity = {
  timeComponent: TimeComponent;
};

export type AgentEntity = {
  id: string;
  particle: ParticleComponent;
  health: HealthComponent;
  projectileEmitter: ProjectileEmitterComponent;
  warrior: WarriorMiscComponent;
  brain?: DejavuComponent;
  statistics: WarriorStatisticsComponent;
};

export type BulletEntity = {
  particle: ParticleComponent;
  attackEffect: AttackEffectComponent;
};

export type Entity = Partial<
  TimeEntity & EventEntity & AgentEntity & BulletEntity
>;
