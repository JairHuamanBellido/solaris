"use server";

import { TJOIN_OR_LEAVE_ROOM } from "@/core/constants";
import { RoomsService } from "@/domain/service/RoomsService";

export async function SubmitScoreAction(prevState: any, formData: FormData) {
  const roomId = formData.get("roomId") as string;
  const userId = formData.get("userId") as string;
  const score = formData.get("score") as string;

  await RoomsService.submitScore({
    player_id: userId,
    room_id: roomId,
    score: parseInt(score),
  });

  return {
    isSuccess: true,
  };
}

export async function JoinOrLeaveRoomAction(prevState: any, formData: FormData) {
  const roomId = formData.get("roomId") as string;
  const joinOrLeaveAction = formData.get("action") as TJOIN_OR_LEAVE_ROOM;

  await RoomsService.joinOrLeaveRoom(roomId, joinOrLeaveAction);

  return {
    isSuccess: true,
  };
}
