import { UserRepository } from "../../infrastructure/repository/UserRepository";
import { ICreateUser } from "../interface/IUser";

export class UsersService {
  static async create(payload: ICreateUser) {
    return await UserRepository.create(payload);
  }
}
