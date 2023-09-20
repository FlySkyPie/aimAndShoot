/// <reference types="vite/client" />

interface BattleZoneElement extends HTMLElement {}

declare namespace JSX {
  interface IntrinsicElements {
    "battle-zone": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      BattleZoneElement
    > & { class: string };
  }
}
