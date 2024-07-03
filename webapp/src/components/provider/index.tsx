"use client";
import { AblyProvider } from "ably/react";
import * as Ably from "ably";
import { ReactNode } from "react";
import { ABLY_API_KEY } from "@/core/constants";

const client = new Ably.Realtime({
  key: ABLY_API_KEY,
});
export default function Providers({ children }: { children: ReactNode }) {
  return <AblyProvider client={client}>{children}</AblyProvider>;
}
