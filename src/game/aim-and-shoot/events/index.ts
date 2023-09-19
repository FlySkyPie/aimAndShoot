export type ShootEvent = {
  type: "shoot-event";
  paylaod: {
    ownerId: number;
    angle: number;
    x: number;
    y: number;
  };
};

export type InitialCombatEvent = {
  type: "initial-combat";
};

export type EvolveCombatEvent = {
  type: "evolve-combate";
};

export type GameEvent = ShootEvent | InitialCombatEvent | EvolveCombatEvent;
