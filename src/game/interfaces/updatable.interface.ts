import type { World } from "miniplex";

import type { Entity, IQueries } from "../aim-and-shoot/entities";

export interface IUpdatable {
  update(world: World<Entity>, queries: IQueries): void;
}
