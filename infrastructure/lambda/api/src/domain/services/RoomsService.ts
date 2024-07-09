import { AblyController } from "../../infrastructure/ably";
import { RoomRepository } from "../../infrastructure/repository/RoomRepository";
import { IRoomAPI } from "../interface/IRoom";
import { UsersService } from "./UserService";

export class RoomsServices {
  static async getAll() {
    return await RoomRepository.getAll();
  }

  static async findById(id: string): Promise<IRoomAPI> {
    const room = await RoomRepository.findById(id);

    if (!room) {
      throw new Error("Room not fiund");
    }

    let roomResponse: IRoomAPI = {
      current_round: room.current_round,
      max_players: room.max_players,
      _id: room._id,
      name: room.name,
      players: [],
      rounds: [],
      status: room.status,
    };

    for await (const player of room.players) {
      const playerFound = await UsersService.findById(player);
      if (!playerFound) {
        continue;
      }
      roomResponse.players.push({
        id: playerFound.cognito_id,
        name: playerFound.name,
      });
    }

    for await (const round of room.rounds) {
      const playerFound = await UsersService.findById(
        round.winner?.user_id || ""
      );

      if (!playerFound) {
        continue;
      }

      roomResponse.rounds.push({
        ...round,
        winner: {
          user_id: round.winner?.user_id || "",
          user_name: playerFound.name,
          user_number_selected: round.winner?.user_number_selected || 0,
        },
      });
    }

    return roomResponse;
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

  static async removePlayer(room_id: string, player_id: string) {
    const removePlayerQuery = await RoomRepository.removePlayer(
      room_id,
      player_id
    );

    await AblyController.notifyUserLeaveJoinRoom(room_id, player_id);

    return removePlayerQuery;
  }
}
