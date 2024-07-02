import { UserRepository } from "../../infrastructure/repository/UserRepository";

export class UsersService {
  static async findById(id: string) {
    return await UserRepository.findByMongoId(id);
  }
}
