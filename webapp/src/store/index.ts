import { UserModel } from "@/domain/model/User.model";
import { create } from "zustand";

type State = {
  user: UserModel;
};

type Action = {
  updateUser: (newUser: State["user"]) => void;
};

export const useProfileStore = create<State & Action>((set) => ({
  user: {
    email: "",
    id: "",
    name: "",
    username: "",
  },
  updateUser: (newUser) => set(() => ({ user: newUser })),
}));
