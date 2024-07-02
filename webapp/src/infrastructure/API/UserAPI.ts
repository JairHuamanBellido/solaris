import { API_URL } from "@/core/constants";
import { cookies } from "next/headers";
import { IAPIUser } from "../model/APIUser.interface";

export class UsersAPI {
  static async getProfile(): Promise<IAPIUser | Error> {
    return await fetch(`${API_URL}/profile`, {
      headers: { Authorization: cookies().get("token")?.value ?? "" },
    }).then(async (res) => {
      const response = await res.json();
      if (res.status >= 400) {
        return new Error("Internal Error");
      }
      return response;
    });
  }
}
