import { RoomsAPI } from "@/infrastructure/API/RoomAPI";
import { RoomsModel } from "../model/Rooms.model";
import { TJOIN_OR_LEAVE_ROOM } from "@/core/constants";

export class RoomsService {
  static async getAll(): Promise<RoomsModel[]> {
    const roomsAPI = await RoomsAPI.getAll();

    return roomsAPI.map(
      ({ _id, max_players, name, players, status, rounds, current_round }) => ({
        id: _id,
        name,
        players,
        status,
        max_players,
        rounds,
        current_round,
      })
    );
  }

  static async getById(id: string): Promise<RoomsModel> {
    const { _id, max_players, name, players, status, rounds, current_round } =
      await RoomsAPI.getById(id);

    return {
      id: _id,
      max_players,
      name,
      players,
      status,
      rounds,
      current_round,
    };
  }

  static async joinOrLeaveRoom(
    room_id: string,
    type: TJOIN_OR_LEAVE_ROOM
  ): Promise<any> {
    return await RoomsAPI.joinOrLeaveRoom({ room_id, type });
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
    return await RoomsAPI.submitScore({ player_id, room_id, score });
  }
}
