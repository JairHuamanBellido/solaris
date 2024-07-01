import { TWinnerRound } from "@/domain/model/LogsMessage.model";
import { Trophy } from "lucide-react";
import { Paragraph } from "../typography";

export default function WinnnerCallLog({
  average,
  user_id,
  user_number_selected,
}: TWinnerRound) {
  return (
    <div className="p-4 flex-col w-full bg-primary/5 text-foreground rounded">
      <div className="flex items-center space-x-2 text-primary">
        <Trophy />
        <Paragraph className="text-xl font-semibold">
          Winner: {user_id}
        </Paragraph>
      </div>
      <div className="mt-2 space-y-2">
        <Paragraph>Average: {average}</Paragraph>
        <Paragraph>User number selected: {user_number_selected}</Paragraph>
      </div>
    </div>
  );
}
