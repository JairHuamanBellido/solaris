import { SubmitScoreAction } from "@/app/rooms/[id]/action";
import { RoomsModel } from "@/domain/model/Rooms.model";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import SubmitButton from "../button/submit-button";
import { useChannel } from "ably/react";
import { useProfileStore } from "@/store";

const arr = Array.from({ length: 100 }, (_, index) => index);

interface Props {
  room: RoomsModel;
}
export default function Board({ room }: Props) {
  const { user } = useProfileStore();
  const [selected, setSelected] = useState<number | null>(null);

  const [_, action] = useFormState<any, FormData>(SubmitScoreAction, {});
  const [isNotAllowToPlay, setIsNotAllowToPlay] = useState<boolean>(false);

  useEffect(() => {
    if (room.rounds.length) {
      if (!room.rounds[room.current_round - 1]) {
        setIsNotAllowToPlay(false);
      } else {
        setIsNotAllowToPlay(
          room.rounds[room.current_round - 1].score.some(
            (s) => s.user_id === ""
          )
        );
      }
    }
  }, [user, room]);
  useChannel(`${room.id}:score`, (message) => {
    const userId = message.data.user_id;
    if (userId === user.id) {
      setIsNotAllowToPlay(true);
    }
  });

  useChannel(`${room.id}:winner`, () => {
    setIsNotAllowToPlay(false);
    setSelected(-1);
  });

  return (
    <div className="flex flex-col flex-3 justify-center items-center">
      <div className="grid grid-rows-10 w-[800px] grid-flow-col gap-4">
        {arr.map((n) => (
          <div
            key={`select-${n}`}
            onClick={() => {
              setSelected(n);
            }}
            className={cn(
              "transition-all cursor-pointer flex items-center p-4 justify-center  rounded border border-muted-foreground/30",
              {
                "bg-primary": selected === n,
                none: selected !== n,
              }
            )}
          >
            <p>{n}</p>
          </div>
        ))}
      </div>
      <div className="w-[800px] flex justify-end">
        <form className="mt-4 justify-end items-end " action={action}>
          <input
            className="hidden h-0"
            type="text"
            name="roomId"
            value={room.id}
          />
          <input
            className="hidden h-0"
            type="text"
            name="userId"
            value={user.id}
          />
          <input
            className="hidden h-0"
            type="text"
            name="score"
            value={selected || -1}
          />
          <SubmitButton disable={isNotAllowToPlay || !selected}>
            Choose
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}
