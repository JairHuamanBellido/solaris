import { API_URL } from "@/core/constants";
import { IAPIRoom } from "../model/APIRoom.interface";

export class RoomsAPI {
  static async getAll(): Promise<IAPIRoom[]> {
    return await fetch(`${API_URL}/rooms`, { next: { tags: ["rooms"] } }).then(
      (res) => res.json()
    );
  }

  static async getById(id: string): Promise<IAPIRoom> {
    return await fetch(`${API_URL}/rooms/${id}`, {
      next: { tags: [`rooms-${id}`] },
    }).then((res) => res.json());
  }

  static async joinRoom(room_id: string, player_id: string): Promise<any> {
    return await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/rooms/${room_id}/game`,
      {
        method: "POST",
        body: JSON.stringify({ player_id }),
      }
    ).then((res) => {
      console.log(res.ok);
      return res.json();
    });
  }

  static async submitScore({
    player_id,
    room_id,
    score,
  }: {
    room_id: string;
    player_id: string;
    score: number;
  }) {
    return await fetch(`${API_URL}/rooms/${room_id}/score`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomId: room_id, userId: player_id, score }),
    }).then((res) => res.json());
  }
}
