"use client";
import { RoomsModel } from "@/domain/model/Rooms.model";
import { RoomsService } from "@/domain/service/RoomsService";
import { useMutation } from "@tanstack/react-query";
import { ChannelProvider, useChannel } from "ably/react";
import { useState } from "react";
import BoardGameContainer from "./board-game-container";
import { Heading1, Paragraph, ParagraphMuted } from "../typography";
import { Loader2Icon } from "lucide-react";
import { Button } from "../ui/button";
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

  const [numberOfPlayers, setNumberOfPlayers] = useState<number>(
    room.players.length
  );

  const [logs, setLogs] = useState<string[]>([]);
  const [isGameReady, setIsGameReady] = useState<boolean>(false);

  useChannel(`${room.id}:ready`, (message) => {
    if (message.data.status === "READY") {
      setIsGameReady(true);
    }
  });
  useChannel(`${room.id}:join`, (message) => {
    setNumberOfPlayers((prev) => prev + 1);
    setLogs([...logs, `${message.data.userId} has joined.`]);
  });

  if (isGameReady || room.status === "READY") {
    return (
      <div className="p-8">
        <BoardGameContainer room={room} />
      </div>
    );
  }
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Heading1 className="mb-2">Welcome to {room.name}</Heading1>

      <div>
        <Paragraph>
          Players: {numberOfPlayers} / {room.max_players}
        </Paragraph>
      </div>

      <div className="flex items-center justify-center space-x-4 my-8">
        <Loader2Icon className="animate-spin" />
        <ParagraphMuted className="text-base">
          {" "}
          Waiting for others players...
        </ParagraphMuted>
      </div>

      <Button
        onClick={() => {
          mutate(room.id);
        }}
      >
        Join
      </Button>
    </div>
  );
}
