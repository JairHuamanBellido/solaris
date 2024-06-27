import { RoomsModel } from "@/domain/model/Rooms.model";
import Board from "../game/board";
import LiveActivityWrapper from "../game/live-activity";

interface Props {
  room: RoomsModel;
}
export default function BoardGameContainer({ room }: Props) {
  return (
    <div className="flex ">
      <Board room={room} />
      <LiveActivityWrapper room={room} />
    </div>
  );
}
