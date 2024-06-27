import { AblyController } from "../../infrastructure/ably";
import { RoomRepository } from "../../infrastructure/repository/RoomRepository";

export class RoomsServices {
  static async getAll() {
    return await RoomRepository.getAll();
  }

  static async findById(id: string) {
    return await RoomRepository.findById(id);
  }

  static async addPlayer(room_id: string, player_id: string) {
    const addPlayerQuery = await RoomRepository.addPlayer(room_id, player_id);

    const getRoom = await this.findById(room_id);

    if (!getRoom) {
      throw new Error("Room not found");
    }

    await AblyController.notifyNewUserJoinRoom(room_id, player_id);

    if (getRoom.players.length === getRoom.max_players) {
      // Update rooms status to READY
      await RoomRepository.updateStatusToReady(room_id);

      // Emit websocket notification
      await AblyController.notifyGameReady(room_id);
    }

    return addPlayerQuery;
  }
}
