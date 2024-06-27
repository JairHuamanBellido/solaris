export interface RoomsModel {
  readonly id: string;
  readonly name: string;
  readonly players: string[];
  readonly max_players: number;
  readonly status: "WAITING" | "READY";
}
