import { RoomsModel } from "@/domain/model/Rooms.model";
import Board from "../game/board";
import LiveActivityContainer from "../game/live-activity";
import { ChannelProvider } from "ably/react";
import WinnerList from "../game/winner-list";

interface Props {
  room: RoomsModel;
}
export default function BoardGameContainer({ room }: Props) {
  return (
    <div className="flex w-full space-x-4">
      <ChannelProvider channelName={`${room.id}:score`}>
        <ChannelProvider channelName={`${room.id}:winner`}>
          <>
            <LiveActivityContainer room={room} />
            <Board room={room} />
            <WinnerList room={room} />
          </>
        </ChannelProvider>
      </ChannelProvider>
    </div>
  );
}
