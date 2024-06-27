import { APIGatewayEvent } from "aws-lambda";
import { RoomsServices } from "../domain/services/RoomsService";

interface IJoinRoom {
  player_id: string;
}

export const handler = async (event: APIGatewayEvent, context: any) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { id: room_id } = event.pathParameters as { id: string };
    const payload = JSON.parse(event.body || "") as IJoinRoom;

    await RoomsServices.addPlayer(room_id, payload.player_id);

    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      statusCode: 200,
      body: JSON.stringify({ message: "Joined" }),
    };
  } catch (error) {
    console.log(error);

    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      statusCode: 500,
      body: JSON.stringify({ message: "Something went wrong!" }),
    };
  }
};
