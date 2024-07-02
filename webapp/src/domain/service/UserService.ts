import { UsersAPI } from "@/infrastructure/API/UserAPI";
import { UserModel } from "../model/User.model";

export class UserService {
  static async getProfile(): Promise<UserModel> {
    return await UsersAPI.getProfile().then((user) => ({
      email: user.email,
      id: user._id,
      name: user.name,
      username: user.username,
    }));
  }
}
