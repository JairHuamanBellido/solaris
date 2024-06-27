export interface IAPIRoom {
  readonly _id: string;
  readonly name: string;
  readonly players: string[];
  readonly status: "WAITING" | "READY";
  readonly max_players: number;
}
