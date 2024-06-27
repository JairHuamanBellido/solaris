import { Realtime } from "ably";
export class AblyController {
  private static ably = new Realtime(process.env.ABLY_KEY || "");

  static async notifyNewUserJoinRoom(room_id: string, user_id: string) {
    const channel = this.ably.channels.get(`${room_id}:join`);
    return await channel.publish(`${room_id}`, { userId: user_id });
  }

  static async notifyGameReady(room_id: string) {
    const channel = this.ably.channels.get(`${room_id}:ready`);
    return await channel.publish(`${room_id}:ready`, { status: "READY" });
  }
}
