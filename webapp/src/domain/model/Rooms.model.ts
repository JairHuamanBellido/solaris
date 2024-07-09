import { IRounds } from "@/infrastructure/model/APIRoom.interface";

export interface RoomsModel {
  readonly id: string;
  readonly name: string;
  readonly players: { id: string; name: string }[];
  readonly max_players: number;
  readonly status: "WAITING" | "READY";
  readonly rounds: IRounds[];
  readonly current_round: number;
}
