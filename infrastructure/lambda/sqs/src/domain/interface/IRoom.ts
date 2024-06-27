import { WithId } from "mongodb";

export interface Score {
  readonly user_id: string;
  readonly number_selected: number;
}
export interface IRounds {
  readonly id: number;
  average_number: number;
  status: "OPEN" | "CLOSED";
  readonly score: Score[];
}

export interface IRoom {
  readonly name: string;
  readonly players: Array<string>;
  readonly status: "WAITING" | "READY";
  readonly max_players: number;
  readonly rounds: IRounds[];
}

export interface IRoomMongoDB extends WithId<IRoom> {}
