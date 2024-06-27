import { SubmitScoreAction } from "@/app/rooms/[id]/action";
import { RoomsModel } from "@/domain/model/Rooms.model";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

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
    <div className="flex flex-col">
      <div className="grid grid-rows-10 w-[800px] grid-flow-col gap-4">
        {arr.map((n) => (
          <div
            onClick={() => {
              setSelected(n);
            }}
            style={{ background: selected === n ? "#ff4343" : "none" }}
            className={
              "cursor-pointer flex items-center p-4 justify-center  rounded border border-white "
            }
          >
            <p>{n}</p>
          </div>
        ))}
      </div>
      <form action={action}>
        <input
          className="hidden h-0"
          type="text"
          name="roomId"
          value={room.id}
        />
        <input className="hidden h-0" type="text" name="userId" value={name} />
        <input
          className="hidden h-0"
          type="text"
          name="score"
          value={selected}
        />
        <button disabled={selected === 0} type="submit">
          Submit
        </button>
        {state && state.isSuccess && <p>Enviado</p>}
      </form>
    </div>
  );
}
