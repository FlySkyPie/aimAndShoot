import type { Query, With } from "miniplex";

import type { Entity } from "./entity.interface";

export interface IQueries {
  Time: Query<With<Entity, "timeComponent">>;
  bullet: Query<With<Entity, "particle" | "attackEffect">>;
}
