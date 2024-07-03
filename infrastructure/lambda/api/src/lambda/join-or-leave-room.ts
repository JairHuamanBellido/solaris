import { APIGatewayEvent } from "aws-lambda";
import { RoomsServices } from "../domain/services/RoomsService";
import { jwtDecode } from "jwt-decode";

interface IJoinRoom {
  type: "JOIN" | "LEAVE";
}

export const handler = async (event: APIGatewayEvent, context: any) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const jwtToken = event.headers["Authorization"] ?? "";
    const userId = jwtDecode(jwtToken).sub ?? "";

    const { id: room_id } = event.pathParameters as { id: string };
    const payload = JSON.parse(event.body || "") as IJoinRoom;

    if (payload.type === "JOIN") {
      await RoomsServices.addPlayer(room_id, userId);
    } else {
      await RoomsServices.removePlayer(room_id, userId);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Joined" }),
    };
  } catch (error) {
    console.log(error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Something went wrong!" }),
    };
  }
};
