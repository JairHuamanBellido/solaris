import { IUser } from "../../domain/interface/IUser";
import { connectToDatabase } from "../mongodb";

export class UserRepository {
  private static _userCollection: string = "users";

  static async findByCognitoId(id: string) {
    const db = await connectToDatabase();

    const usersCollection = db.collection<IUser>(this._userCollection);

    return await usersCollection.findOne<IUser>({ cognito_id: id });
  }
}
