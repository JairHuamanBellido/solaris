import { TJOIN_OR_LEAVE_ROOM } from "@/core/constants";

export interface IAPIRoom {
  readonly _id: string;
  readonly name: string;
  readonly players: string[];
  readonly status: "WAITING" | "READY";
  readonly max_players: number;
}

export interface IJoinOrLeaveRoomPayload {
  readonly room_id: string;
  readonly type: TJOIN_OR_LEAVE_ROOM;
}
