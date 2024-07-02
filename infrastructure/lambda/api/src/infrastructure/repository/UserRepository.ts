import { IUser } from "../../domain/interface/IUser";
import { connectToDatabase } from "../mongodb";

export class UserRepository {
  private static _userCollection: string = "users";

  static async findByMongoId(id: string) {
    const db = await connectToDatabase();

    const usersCollection = db.collection<IUser>(this._userCollection);

    return await usersCollection.findOne<IUser>({ mongodb_id: id });
  }
}
