import { UsersAPI } from "@/infrastructure/API/UserAPI";
import { UserModel } from "../model/User.model";

export class UserService {
  static async getProfile(): Promise<UserModel | Error> {
    const userAPI = await UsersAPI.getProfile();

    if (userAPI instanceof Error) {
      return new Error();
    }

    return {
      email: userAPI.email,
      id: userAPI._id,
      name: userAPI.name,
      username: userAPI.username,
    };
  }
}
