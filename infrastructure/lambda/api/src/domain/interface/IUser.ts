import { WithId } from "mongodb";

export interface ICreateUser {
  id: string;
  username: string;
  name: string;
  email: string;
}
export interface IUser {
  readonly name: string;
  readonly username: string;
  readonly email: string;
  readonly mongodb_id: string;
}

export interface IUserMongoDB extends WithId<IUser> {}
