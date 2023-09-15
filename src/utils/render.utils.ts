import { Constants } from "../constants";
import type { IPlayerEntity } from "../interfaces/player-entity.interface";

export abstract class RenderUtils {
  public static renderPlayer(
    ctx: CanvasRenderingContext2D,
    player: IPlayerEntity
  ) {
    if (player.isDead) {
      player.iAnim += 0.1;

      ctx.fillStyle =
        "rgba(" +
        player.color[0] +
        "," +
        player.color[1] +
        "," +
        player.color[2] +
        "," +
        (1 - player.iAnim) +
        ")";

      ctx.beginPath();

      ctx.arc(player.pos.x, player.pos.y, player.size, 0, Constants.TWOPI);

      ctx.fill();

      ctx.save();

      ctx.translate(player.pos.x, player.pos.y);

      ctx.rotate(player.angle + player.iAnim);

      ctx.fillRect(player.iAnim * 50, -9, 50, 18);

      ctx.restore();

      return;
    }

    RenderUtils.renderHealthBar(ctx, player);
    RenderUtils.renderCooldownBar(ctx, player);

    ctx.fillStyle =
      "rgb(" +
      player.color[0] +
      "," +
      player.color[1] +
      "," +
      player.color[2] +
      ")";

    ctx.shadowColor = "black";

    ctx.shadowBlur = 5;

    ctx.save();

    ctx.translate(player.pos.x, player.pos.y);

    ctx.rotate(player.angle);

    ctx.fillRect(0, -9, 50, 18);

    ctx.restore();

    ctx.beginPath();

    ctx.arc(player.pos.x, player.pos.y, player.size, 0, Constants.TWOPI);

    ctx.fill();

    ctx.shadowBlur = 0;
  }

  private static renderHealthBar(
    ctx: CanvasRenderingContext2D,
    player: IPlayerEntity
  ) {
    ctx.fillStyle = "red";

    ctx.fillRect(player.pos.x - 50, player.pos.y - 60, player.health * 10, 10);

    ctx.strokeRect(player.pos.x - 50, player.pos.y - 60, 100, 10);
  }

  private static renderCooldownBar(
    ctx: CanvasRenderingContext2D,
    player: IPlayerEntity
  ) {
    ctx.fillStyle = "green";

    ctx.fillRect(
      player.pos.x - 50,
      player.pos.y - 45,
      Math.max(0, (player.coolDown / player.coolDownInit) * 100),
      10
    );

    ctx.strokeRect(player.pos.x - 50, player.pos.y - 45, 100, 10);
  }
}
