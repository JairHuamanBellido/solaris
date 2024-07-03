export interface IAPIUser {
  readonly _id: string;
  readonly email: string;
  readonly name: string;
  readonly username: string;
  readonly cognito_id: string;
}
