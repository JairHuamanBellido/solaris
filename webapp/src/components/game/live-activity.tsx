import { RoomsModel } from "@/domain/model/Rooms.model";
import { ChannelProvider, useChannel } from "ably/react";
import { useState } from "react";

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
  const [logs, setLogs] = useState<string[]>([]);
  useChannel(`${room.id}:score`, (message) => {
    const userId = message.data.user_id;
    setLogs([...logs, `${userId} played`]);
  });

  useChannel(`${room.id}:winner`, (message) => {
    console.log(message.data);
    const userId = message.data.user_id;
    const average = message.data.average_number;
    const userNumberSelected = message.data.user_number_selected;

    setLogs([
      ...logs,
      `Winner: ${userId}. Average: ${average}. Most close: ${userNumberSelected}`,
    ]);
  });

  return (
    <div className="flex flex-col space-y-2 w-[400px] rounded border">
      {logs.map((log) => (
        <div key={log}>
          <p className="text-green-500">{log}</p>
        </div>
      ))}
    </div>
  );
}
