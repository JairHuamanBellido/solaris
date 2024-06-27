import { WithId } from "mongodb";

interface Score {
  readonly user_id: string;
  readonly number_selected: number;
}
interface IRounds {
  readonly id: number;
  readonly average_number: number;
  readonly status: "OPEN" | "CLOSED";
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
