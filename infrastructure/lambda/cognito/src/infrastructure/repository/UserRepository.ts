import { ICreateUser, IUser } from "../../domain/interface/IUser";
import { connectToDatabase } from "../mongodb";

export class UserRepository {
  private static _userCollection: string = "users";

  static async create(payload: ICreateUser) {
    const db = await connectToDatabase();

    const usersCollection = db.collection<IUser>(this._userCollection);

    return await usersCollection.insertOne({
      email: payload.email,
      name: payload.name,
      username: payload.username,
      mongodb_id: payload.id,
    });
  }
}
