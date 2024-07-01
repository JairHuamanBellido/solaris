import { RoomsModel } from "@/domain/model/Rooms.model";
import Board from "../game/board";
import LiveActivityWrapper from "../game/live-activity";

interface Props {
  room: RoomsModel;
}
export default function BoardGameContainer({ room }: Props) {
  return (
    <div className="flex w-full space-x-4">
      <LiveActivityWrapper room={room} />
      <Board room={room} />
    </div>
  );
}
