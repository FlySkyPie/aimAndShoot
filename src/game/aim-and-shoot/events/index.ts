export type ShootEvent = {
  type: "shoot-event";
  paylaod: {
    ownerId: string;
    angle: number;
    x: number;
    y: number;
  };
};

export type InitialCombatEvent = {
  type: "initial-combat";
};

export type GameEvent = ShootEvent | InitialCombatEvent;
