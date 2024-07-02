import { API_URL } from "@/core/constants";
import { cookies } from "next/headers";
import { IAPIUser } from "../model/APIUser.interface";

export class UsersAPI {
  static async getProfile(): Promise<IAPIUser> {
    return await fetch(`${API_URL}/profile`, {
      headers: { Authorization: cookies().get("token")?.value ?? "" },
    }).then((res) => res.json());
  }
}
