export interface CombatPanelEventMap extends HTMLElementEventMap {
  ["canvas-ready"]:  CustomEvent<HTMLCanvasElement>;
}
