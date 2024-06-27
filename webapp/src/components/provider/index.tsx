"use client";
import { AblyProvider } from "ably/react";
import * as Ably from "ably";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ABLY_API_KEY } from "@/core/constants";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

const client = new Ably.Realtime({
  key: ABLY_API_KEY,
});
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AblyProvider client={client}>{children}</AblyProvider>
      {/* {children} */}
    </QueryClientProvider>
  );
}
