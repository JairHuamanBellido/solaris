import { Realtime } from "ably";
export class AblyController {
  private static ably = new Realtime(process.env.ABLY_KEY || "");

  static async notifyScoreSubmitted(room_id: string, user_id: string) {
    const channel = this.ably.channels.get(`${room_id}:score`);
    return await channel.publish(`${room_id}:score`, { user_id });
  }
}
