import { WithId } from "mongodb";

interface Score {
  readonly user_id: string;
  readonly user_name:string;
  readonly number_selected: number;
}
interface IRounds {
  readonly id: number;
  readonly average_number: number;
  readonly status: "OPEN" | "CLOSED";
  readonly score: Score[];
  winner: Winner | null;
}

interface Winner {
  readonly user_id: string;
  readonly user_number_selected: number;
}

interface WinnerAPI {
  readonly user_id: string;
  readonly user_name: string;
  readonly user_number_selected: number;
}

interface RoundsAPI extends Omit<IRounds, "winner"> {
  winner: WinnerAPI | null;
}

export interface IRoomAPI extends Pick<IRoomMongoDB, "name" | "status" | "max_players" |'current_round' | "_id"> {
  players: {
    id: string;
    name: string;
  }[];
  rounds: RoundsAPI[];
}

export interface IRoom {
  readonly name: string;
  readonly players: Array<string>;
  readonly status: "WAITING" | "READY";
  readonly max_players: number;
  readonly rounds: IRounds[];
  current_round: number;
}

export interface IRoomMongoDB extends WithId<IRoom> {}
