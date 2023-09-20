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
  type: "evolve-combat";
};

export type AgentDeadEvent = {
  type: "agent-dead";
  payload: {
    name: string;
    isBot: boolean;
  };
};

export type GameEvent =
  | ShootEvent
  | InitialCombatEvent
  | EvolveCombatEvent
  | AgentDeadEvent;
