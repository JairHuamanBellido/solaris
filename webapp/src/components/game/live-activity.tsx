import { RoomsModel } from "@/domain/model/Rooms.model";
import { useChannel } from "ably/react";
import { useState } from "react";
import { Heading3 } from "../typography";
import { TLiveActivityMessage } from "@/domain/model/LogsMessage.model";
import Player from "./player-label";

interface Props {
  room: RoomsModel;
}

export default function LiveActivityContainer({ room }: Props) {
  const [currentRound, setCurrentRound] = useState<number>(room.current_round);

  useChannel(`${room.id}:winner`, (message) => {
    setCurrentRound((prev) => prev + 1);
  });

  return (
    <div className="flex max-w-[320px] flex-1 flex-col  rounded p-4">
      <Heading3 className="text-2xl font-normal mb-4">
        Round {currentRound}
      </Heading3>
      <div className="space-y-2 overflow-auto">
        {room.players.map((player) => (
          <Player
            key={`player-${player.id}`}
            name={player.name}
            id={player.id}
            room={room}
          />
        ))}
      </div>
    </div>
  );
}
