import { PreSignUpTriggerEvent } from "aws-lambda";
export const handler = async (
  event: PreSignUpTriggerEvent,
  context: any,
  callback: any
) => {
  try {
    event.response.autoConfirmUser = true;
    callback(null, event);
  } catch (error) {
    callback(error, event);
  }
};
