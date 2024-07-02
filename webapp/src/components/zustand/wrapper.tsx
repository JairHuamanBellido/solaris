"use client";

import { UserModel } from "@/domain/model/User.model";
import { useProfileStore } from "@/store";
import { useEffect } from "react";

interface Props {
  user: UserModel;
}
export default function ZustandWrapper({ user }: Props) {
  const { updateUser } = useProfileStore();
  useEffect(() => {
    updateUser(user);
  }, [user, updateUser]);
  return <></>;
}
