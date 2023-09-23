import type { World } from "miniplex";
import { Howl } from "howler";

import type { IUpdatable, IDisposable } from "../../../interfaces";

import type { Entity, IQueries } from "../../entities";
import gunSfxUrl from "../../assets/gun-sfx/Air-rifle-gun-shot.mp3";

export class SoundEffectSystem implements IUpdatable, IDisposable {
  private fireSFX = new Howl({
    src: [gunSfxUrl],
    volume: 0.3,
  });

  public update(_: World<Entity>, queries: IQueries): void {
    const { events } = queries.Event.first!;

    const gunFireEvents = events.filter((item) => {
      return item.type === "shoot-event";
    });
    if (gunFireEvents.length > 0) {
      this.fireSFX.play();
    }
  }

  public dispose(): void {
    this.fireSFX.unload();
  }
}
