"use client";
import { RoomsModel } from "@/domain/model/Rooms.model";
import { ChannelProvider, useChannel } from "ably/react";
import { useEffect, useState } from "react";
import BoardGameContainer from "./board-game-container";
import { Heading1, Paragraph, ParagraphMuted } from "../typography";
import { Loader2Icon } from "lucide-react";
import { TJOIN_OR_LEAVE_ROOM } from "@/core/constants";
import { useFormState } from "react-dom";
import { JoinOrLeaveRoomAction } from "@/app/rooms/[id]/action";
import { Input } from "../ui/input";
import SubmitButton from "../button/submit-button";
import { useProfileStore } from "@/store";
interface Props {
  room: RoomsModel;
}

export default function RoomContainerDetail({ room }: Props) {
  return (
    <ChannelProvider channelName={`${room.id}`}>
      <ChannelProvider channelName={`${room.id}:ready`}>
        <ChannelProvider channelName={`${room.id}:join`}>
          <ChannelProvider channelName={`${room.id}:leave`}>
            <Container room={room} />
          </ChannelProvider>
        </ChannelProvider>
      </ChannelProvider>
    </ChannelProvider>
  );
}

function Container({ room }: Props) {
  const [numberOfPlayers, setNumberOfPlayers] = useState<number>(
    room.players.length
  );

  const { user } = useProfileStore();
  const [isAlreadyJoined, setIsAlreadyJoined] = useState<boolean>(false);

  useEffect(() => {
    setIsAlreadyJoined(room.players.some((player) => player.id === user.id));
  }, [user, room]);

  useChannel(`${room.id}:ready`, (message) => {
    if (message.data.status === "READY") {
      window.location.reload();
    }
  });
  useChannel(`${room.id}:join`, (message) => {
    setNumberOfPlayers((prev) => prev + 1);

    if (message.data.userId === user.id) {
      setIsAlreadyJoined(true);
    }
  });

  useChannel(`${room.id}:leave`, (message) => {
    setNumberOfPlayers((prev) => prev - 1);

    if (message.data.userId === user.id) {
      setIsAlreadyJoined(false);
    }
  });

  if (room.status === "READY") {
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

      <JoinOrLeaveForm type={isAlreadyJoined ? "LEAVE" : "JOIN"} room={room} />
    </div>
  );
}

function JoinOrLeaveForm({
  type,
  room,
}: {
  type: TJOIN_OR_LEAVE_ROOM;
  room: RoomsModel;
}) {
  const [_, action] = useFormState<any, FormData>(JoinOrLeaveRoomAction, {});

  return (
    <form action={action} className="flex flex-col space-y-4">
      <Input className="hidden h-0" name="roomId" value={room.id} />
      <Input className="hidden h-0" name="action" value={type} />
      <SubmitButton variant={type === "JOIN" ? "default" : "destructive"}>
        {type === "JOIN" ? "Join" : "Leave"}
      </SubmitButton>
    </form>
  );
}
