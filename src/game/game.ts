import type { IUpdatable } from "./interfaces/updatable.interface";
import { SampleRenderSystem } from "./systems/sample-render.system";

export class Game {
  private animationId: number = NaN;

  private systems: IUpdatable[] = [];

  constructor(canvas: HTMLCanvasElement) {
    this.systems = [new SampleRenderSystem(canvas)];
  }

  public start() {
    this.update();
  }

  public stop() {
    cancelAnimationFrame(this.animationId);
  }

  private update = () => {
    this.systems.forEach((item) => item.update());
    this.animationId = requestAnimationFrame(this.update);
  };
}
