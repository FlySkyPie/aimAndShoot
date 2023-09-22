/// <reference types="vite/client" />
// export interface IGameEventMap {
//   ["agent-dead"]: [
//     {
//       kiiledBy?: string;
//     }
//   ];
//   ["combate-start"]: [
//     {
//       generation: number;
//       agents: {
//         id: string;
//         name: string;
//         color: string;
//       }[];
//     }
//   ];
//   ["combate-updated"]: [
//     {
//       agents: {
//         id: string;
//         health: number;
//       }[];
//     }
//   ];
//   ["combate-end"]: [
//     {
//       agents: {
//         id: string;
//         hitRate: number;
//       }[];
//     }
//   ];
// }

// interface BattleZoneElement extends HTMLElement {
//   on<TEventName extends keyof IGameEventMap & string>(
//     eventName: TEventName,
//     handler: (...eventArg: IGameEventMap[TEventName]) => void
//   ): void;

//   off<TEventName extends keyof IGameEventMap & string>(
//     eventName: TEventName,
//     handler: (...eventArg: IGameEventMap[TEventName]) => void
//   ): void;
// }

declare namespace JSX {
  interface IntrinsicElements {
    "battle-zone": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      BattleZoneElement
    > & {
      class: string;
    };
  }
}
