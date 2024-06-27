import { SQSEvent } from "aws-lambda";
import { RoomsServices } from "../domain/services/RoomsService";

export const handler = async (event: SQSEvent) => {
  try {
    const payload = JSON.parse(event.Records[0].body);
    await RoomsServices.addScore({
      roomId: payload.roomId,
      score: parseInt(payload.score),
      userId: payload.userId,
    });

    return await Promise.resolve(1);
  } catch (error) {
    console.log(error);

    throw error;
  }
};
