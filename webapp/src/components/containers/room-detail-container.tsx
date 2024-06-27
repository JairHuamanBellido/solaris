"use client";
import { RoomsModel } from "@/domain/model/Rooms.model";
import { RoomsService } from "@/domain/service/RoomsService";
import { useMutation } from "@tanstack/react-query";
import { ChannelProvider, useChannel } from "ably/react";
import { useEffect, useState } from "react";
import BoardGameContainer from "./board-game-container";
interface Props {
  room: RoomsModel;
}

export default function RoomContainerDetail({ room }: Props) {
  return (
    <ChannelProvider channelName={`${room.id}`}>
      <ChannelProvider channelName={`${room.id}:ready`}>
        <ChannelProvider channelName={`${room.id}:join`}>
          <Container room={room} />
        </ChannelProvider>
      </ChannelProvider>
    </ChannelProvider>
  );
}

function Container({ room }: Props) {
  const { mutate } = useMutation({
    mutationFn: async (room_id: string) => await RoomsService.joinRoom(room_id),
  });

  const [logs, setLogs] = useState<string[]>([]);
  const [isGameReady, setIsGameReady] = useState<boolean>(false);

  useChannel(`${room.id}:ready`, (message) => {
    if (message.data.status === "READY") {
      setIsGameReady(true);
    }
  });
  useChannel(`${room.id}:join`, (message) => {
    setLogs([...logs, `${message.data.userId} has joined.`]);
  });

  const [name, setName] = useState<string>("");

  useEffect(() => {
    setName(localStorage.getItem("userId") || "");
  }, []);

  if (isGameReady || room.status === "READY") {
    return (
      <div className="">
        <BoardGameContainer room={room} />
      </div>
    );
  }
  return (
    <div>
      <h1>{room.name}</h1>
      <p>status: {room.status}</p>
      <p>
        Players: {room.players.length} / {room.max_players}
      </p>
      <button
        onClick={() => mutate(room.id)}
        className="p-4 rounded bg-blue-500"
      >
        Join
      </button>
      <div>
        <h2 className="text-2xl">Logs</h2>
        <div className="flex flex-col space-y-2 text-sm text-green-500">
          {logs.map((log, i) => (
            <p key={i}>{log}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
