import { Info } from "lucide-react";
import { Paragraph } from "../typography";
import { TPlayerAction } from "@/domain/model/LogsMessage.model";

export default function PlayerActionLog({ user_id }: TPlayerAction) {
  return (
    <div className="w-full p-2 flex items-center space-x-2 hover:bg-white/5">
      <Info />
      <Paragraph>
        <span className="font-bold">{user_id}</span> has played
      </Paragraph>
    </div>
  );
}
