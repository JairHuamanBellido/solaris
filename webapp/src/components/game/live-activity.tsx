import { RoomsModel } from "@/domain/model/Rooms.model";
import { ChannelProvider, useChannel } from "ably/react";
import { useState } from "react";
import { Heading3 } from "../typography";
import { TLiveActivityMessage } from "@/domain/model/LogsMessage.model";
import PlayerActionLog from "../logs/player-action-log";
import WinnnerCallLog from "../logs/winner-call-log";

interface Props {
  room: RoomsModel;
}
export default function LiveActivityWrapper({ room }: Props) {
  return (
    <ChannelProvider channelName={`${room.id}:score`}>
      <ChannelProvider channelName={`${room.id}:winner`}>
        <LiveActivityContainer room={room} />
      </ChannelProvider>
    </ChannelProvider>
  );
}

function LiveActivityContainer({ room }: Props) {
  const [logs, setLogs] = useState<TLiveActivityMessage[]>([]);

  useChannel(`${room.id}:score`, (message) => {
    const userId = message.data.user_id;
    setLogs([...logs, { type: "PLAYER_ACTION", user_id: userId }]);
  });

  useChannel(`${room.id}:winner`, (message) => {
    const userId = message.data.user_id;
    const average = message.data.average_number;
    const userNumberSelected = message.data.user_number_selected;

    setLogs([
      ...logs,
      {
        type: "WINNER_ROUND",
        average,
        user_id: userId,
        user_number_selected: userNumberSelected,
      },
    ]);
  });

  return (
    <div className="flex max-w-[320px] flex-1 flex-col space-y-2 w-[400px] rounded border p-4">
      <Heading3 className="text-2xl font-normal mb-4">Live Activity</Heading3>
      <div className="space-y-2">
        {logs.map((log, i) => {
          switch (log.type) {
            case "PLAYER_ACTION":
              return <PlayerActionLog {...log} />;
            case "WINNER_ROUND":
              return <WinnnerCallLog {...log} />;
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}
