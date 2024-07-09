import { UserRepository } from "../../infrastructure/repository/UserRepository";

export class UsersService {
  static async findById(id: string) {
    return await UserRepository.findByCognitoId(id);
  }
}
