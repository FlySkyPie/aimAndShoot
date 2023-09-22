export interface IGameEventMap {
  ["agent-dead"]: [
    {
      name: string;
      isBot: boolean;
      kiiledBy?: string;
    }
  ];
  ["combate-start"]: [
    {
      generation: number;
      agents: {
        id: string;
        name: string;
        color: string;
      }[];
    }
  ];
  ["combate-updated"]: [
    {
      agents: {
        id: string;
        health: number;
      }[];
    }
  ];
  ["combate-end"]: [
    {
      agents: {
        id: string;
        hitRate: number;
      }[];
    }
  ];
}
