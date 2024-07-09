import { TJOIN_OR_LEAVE_ROOM } from "@/core/constants";

export interface IScore {
  readonly user_id: string;
  readonly number_selected: number;
  readonly user_name:string;
}

interface Winner {
  readonly user_id: string;
  readonly user_name:string;
  readonly user_number_selected: number;
}

export interface IRounds {
  readonly id: number;
  readonly average_number: number;
  readonly status: "OPEN" | "CLOSED";
  readonly score: IScore[];
  readonly winner: Winner | null;
}
export interface IAPIRoom {
  readonly _id: string;
  readonly name: string;
  readonly players: { id: string; name: string }[];
  readonly status: "WAITING" | "READY";
  readonly max_players: number;
  readonly rounds: IRounds[];
  readonly current_round: number;
}

export interface IJoinOrLeaveRoomPayload {
  readonly room_id: string;
  readonly type: TJOIN_OR_LEAVE_ROOM;
}
