import { RoomsModel } from "@/domain/model/Rooms.model";
import { useChannel } from "ably/react";
import { Paragraph, ParagraphMuted } from "../typography";
import { useState } from "react";

interface Props {
  id: string;
  name: string;
  room: RoomsModel;
}
export default function Player({ id, name, room }: Props) {
  const currentRound = room.rounds[room.current_round - 1];
  const isPlayerScoreCurrentRound = !currentRound
    ? false
    : room.rounds[room.current_round - 1].score.some(
        (score) => score.user_id === id
      );
  const [isPlayed, setIsPlayed] = useState<boolean>(isPlayerScoreCurrentRound);

  useChannel(`${room.id}:score`, (message) => {
    const userId = message.data.user_id;
    if (id === userId) {
      setIsPlayed(true);
    }
  });

  useChannel(`${room.id}:winner`, (_) => {
    setIsPlayed(false);
  });

  return (
    <div className="flex items-center space-x-2">
      <Paragraph>{name}</Paragraph>
      {isPlayed && (
        <ParagraphMuted className="bg-primary rounded p-1 text-primary-foreground">
          Played
        </ParagraphMuted>
      )}
    </div>
  );
}
