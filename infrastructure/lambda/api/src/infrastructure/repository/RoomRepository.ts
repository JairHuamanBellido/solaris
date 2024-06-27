import { ObjectId } from "mongodb";
import { IRoomMongoDB } from "../../domain/interface/IRoom";
import { connectToDatabase } from "../mongodb";

export class RoomRepository {
  private static _roomCollection: string = "rooms";

  static async getAll() {
    const db = await connectToDatabase();

    const roomsCollection = db.collection<IRoomMongoDB>(this._roomCollection);

    return await roomsCollection.find().toArray();
  }

  static async findById(id: string) {
    const db = await connectToDatabase();

    const roomsCollection = db.collection<IRoomMongoDB>(this._roomCollection);

    return await roomsCollection.findOne({ _id: new ObjectId(id) });
  }

  static async addPlayer(room_id: string, player_id: string) {
    const db = await connectToDatabase();

    const roomsCollection = db.collection<IRoomMongoDB>(this._roomCollection);

    return await roomsCollection.updateOne(
      {
        _id: new ObjectId(room_id),
      },
      {
        $push: {
          players: player_id,
        },
      }
    );
  }

  static async updateStatusToReady(room_id: string) {
    const db = await connectToDatabase();

    const roomsCollection = db.collection<IRoomMongoDB>(this._roomCollection);

    return await roomsCollection.updateOne(
      { _id: new ObjectId(room_id) },
      {
        $set: {
          status: "READY",
        },
      }
    );
  }
}
