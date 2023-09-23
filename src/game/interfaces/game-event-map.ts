export type IAgentDeadEvent = {
  name: string;
  isBot: boolean;
  kiiledBy?: string;
};

export type ICombatStartEvent = {
  generation: number;
  agents: {
    id: string;
    name: string;
    color: string;
  }[];
};

export type ICombatUpdatedEvent = {
  agents: {
    id: string;
    health: number;
  }[];
};

export type ICombatEndEvent = {
  scoreboard: {
    id: string;
    name: string;
    color: string;
    hitRate: number;
  }[];
};

export interface IGameEventMap {
  ["agent-dead"]: [IAgentDeadEvent];
  ["combate-start"]: [ICombatStartEvent];
  ["combate-updated"]: [ICombatUpdatedEvent];
  ["combate-end"]: [ICombatEndEvent];
}
