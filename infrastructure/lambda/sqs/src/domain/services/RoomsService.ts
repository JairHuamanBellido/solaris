import { AblyController } from "../../infrastructure/ably";
import { RoomRepository } from "../../infrastructure/repository/RoomRepository";
import { IRoomMongoDB, IRounds } from "../interface/IRoom";

export class RoomsServices {
  static async addScore({
    roomId,
    score,
    userId,
  }: {
    roomId: string;
    userId: string;
    score: number;
  }) {
    const room = await RoomRepository.findById(roomId);

    if (!room) {
      throw new Error("Room not found");
    }

    const getLastRound = room.rounds.find((round) => round.status === "OPEN");

    await AblyController.notifyScoreSubmitted(roomId, userId);

    // If there isn't round registered, create a new one
    if (!getLastRound) {
      const newRoom: IRoomMongoDB = {
        ...room,
      };
      newRoom.rounds.push({
        id: room.rounds.length + 1,
        average_number: 0,
        score: [{ number_selected: score, user_id: userId }],
        status: "OPEN",
      });
      await RoomRepository.addPlayerScore(newRoom);
      return Promise.resolve(1);
    }

    // If there is a round existed, update the existing one adding the record
    const index = room.rounds.indexOf(getLastRound);
    let round = room.rounds[index];

    round.score.push({ number_selected: score, user_id: userId });

    // Validate the current score is the last one, in order to close the round
    if (round.score.length === room.max_players) {
      round.status = "CLOSED";
      const average_number =
        round.score.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.number_selected;
        }, 0) / room.max_players;

      round.average_number = parseFloat(average_number.toFixed(2));

      const { winnerId, winnerNumber } = this.getWinner(average_number, round);

      AblyController.notifyWinner(roomId, {
        user_id: winnerId,
        average_number: round.average_number,
        user_number_selected: winnerNumber,
      });
    }

    let updateRoom: IRoomMongoDB = {
      ...room,
    };

    updateRoom.rounds[index] = round;

    await RoomRepository.addPlayerScore(updateRoom);
    return Promise.resolve(1);
  }

  private static getWinner(average_number: number, round: IRounds) {
    let winnerId: string = "";
    let differenceMinimun: number = Infinity;
    let winnerNumber: number = 0;

    for (const score of round.score) {
      const numberSelected = score.number_selected;

      const diff = Math.abs(numberSelected - average_number);

      if (diff < differenceMinimun) {
        differenceMinimun = diff;
        winnerId = score.user_id;
        winnerNumber = numberSelected;
      }
    }

    return { winnerId, winnerNumber };
  }
}
