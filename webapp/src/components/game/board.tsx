import { SubmitScoreAction } from "@/app/rooms/[id]/action";
import { RoomsModel } from "@/domain/model/Rooms.model";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import SubmitButton from "../button/submit-button";

const arr = Array.from({ length: 100 }, (_, index) => index + 1);

interface Props {
  room: RoomsModel;
}
export default function Board({ room }: Props) {
  const [selected, setSelected] = useState<number>(0);
  const [name, setName] = useState<string>();
  const [state, action] = useFormState<any, FormData>(SubmitScoreAction, {});

  useEffect(() => {
    setName(localStorage.getItem("userId") || "default");
  }, []);
  return (
    <div className="flex flex-col flex-3 justify-center items-center">
      <div className="grid grid-rows-10 w-[800px] grid-flow-col gap-4">
        {arr.map((n) => (
          <div
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
            value={name}
          />
          <input
            className="hidden h-0"
            type="text"
            name="score"
            value={selected}
          />
          <SubmitButton disable={selected === 0}>Choose</SubmitButton>
        </form>
      </div>
    </div>
  );
}
