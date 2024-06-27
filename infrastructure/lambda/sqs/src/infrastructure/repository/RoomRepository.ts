import { ObjectId } from "mongodb";
import { IRoomMongoDB, Score } from "../../domain/interface/IRoom";
import { connectToDatabase } from "../mongodb";

export class RoomRepository {
  private static _roomCollection: string = "rooms";

  static async findById(id: string) {
    const db = await connectToDatabase();

    const roomsCollection = db.collection<IRoomMongoDB>(this._roomCollection);

    return await roomsCollection.findOne({ _id: new ObjectId(id) });
  }

  static async addPlayerScore(room: IRoomMongoDB) {
    const db = await connectToDatabase();

    const roomsCollection = db.collection<IRoomMongoDB>(this._roomCollection);

    return await roomsCollection.updateOne(
      { _id: new ObjectId(room._id) },
      {
        $set: {
          rounds: room.rounds,
        },
      }
    );
  }
}
