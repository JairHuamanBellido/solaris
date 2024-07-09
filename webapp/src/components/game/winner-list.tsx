import { RoomsModel } from "@/domain/model/Rooms.model";
import { Heading3, Paragraph } from "../typography";
import { useState } from "react";
import { useChannel } from "ably/react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Info } from "lucide-react";

interface Props {
  room: RoomsModel;
}

interface Winner {
  user_id: string;
  user_name: string;
  user_number_selected: number;
  average: number;
  scores: { name: string; number_selected: number }[];
}
export default function WinnerList({ room }: Props) {
  const [winners, setWinners] = useState<Winner[]>([
    ...room.rounds.map((round) => ({
      user_id: round.winner?.user_id || "",
      user_name: round.winner?.user_name || "",
      user_number_selected: round.winner?.user_number_selected || 2,
      average: round.average_number,
      scores: round.score.map((score) => ({
        name: score.user_name,
        number_selected: score.number_selected,
      })),
    })),
  ]);
  useChannel(`${room.id}:winner`, (message) => {
    const userId = message.data.user_id;
    const average = message.data.average_number;
    const userNumberSelected = message.data.user_number_selected;
    const scores = message.data.scores as {
      name: string;
      number_selected: number;
    }[];
    const user_name =
      room.players.find((person) => person.id === userId)?.name || "";

    setWinners((prev) => [
      ...prev,
      {
        average,
        user_id: userId,
        user_name,
        user_number_selected: userNumberSelected,
        scores,
      },
    ]);
  });

  return (
    <div className="flex-1">
      <Heading3>Winners</Heading3>
      {winners.map((winner, index) => (
        <div className="flex items-center space-x-2" key={`winner-${winner.user_id}`}>
          <Paragraph>
            {" "}
            Round #{index + 1}: {winner.user_name} - {winner.average}
          </Paragraph>
          <HoverCard>
            <HoverCardTrigger className="w-fit">
              <Info />
            </HoverCardTrigger>
            <HoverCardContent>
              {winner.scores.map((score) => (
                <Paragraph key={`score-history-${score.name}`}>
                  {score.name}: {score.number_selected}
                </Paragraph>
              ))}
            </HoverCardContent>
          </HoverCard>
        </div>
      ))}
    </div>
  );
}
