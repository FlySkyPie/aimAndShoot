import type { Query, With, Without } from "miniplex";

import type { Entity } from "./entity.interface";

export interface IQueries {
  Time: Query<With<Entity, "timeComponent">>;
  bullet: Query<With<Entity, "particle" | "attackEffect">>;
  player: Query<
    With<
      Entity,
      | "id"
      | "particle"
      | "health"
      | "projectileEmitter"
      | "warrior"
      | "statistics"
    >
  >;
  humanPlayer: Query<
    Without<
      With<
        Entity,
        "particle" | "health" | "projectileEmitter" | "warrior" | "statistics"
      >,
      "brain"
    >
  >;
}
