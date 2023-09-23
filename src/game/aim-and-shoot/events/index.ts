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
    kiiledBy?: string;
  };
};

export type CombatStartedEvent = {
  type: "combat-started";
  payload: {
    generation: number;
    agents: {
      id: string;
      name: string;
      color: string;
    }[];
  };
};

// export type SoundEffectEvent = {
//   type: "play-sound";
//   payload: {
//     sound: "gun-fire";
//   };
// };

export type GameEvent =
  | ShootEvent
  | InitialCombatEvent
  | EvolveCombatEvent
  | AgentDeadEvent
  | CombatStartedEvent;
