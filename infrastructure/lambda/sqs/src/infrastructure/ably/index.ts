import { Realtime } from "ably";

interface INotifyWinnerPayload {
  readonly user_id: string;
  readonly average_number: number;
  readonly user_number_selected: number;
}
export class AblyController {
  private static ably = new Realtime(process.env.ABLY_KEY || "");

  static async notifyScoreSubmitted(room_id: string, user_id: string) {
    const channel = this.ably.channels.get(`${room_id}:score`);
    return await channel.publish(`${room_id}:score`, { user_id });
  }

  static async notifyWinner(room_id: string, payload: INotifyWinnerPayload) {
    const channel = this.ably.channels.get(`${room_id}:winner`);

    return await channel.publish(`${room_id}:winner`, payload);
  }
}
