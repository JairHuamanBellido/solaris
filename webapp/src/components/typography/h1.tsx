import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}
export default function Heading1({ children, className, ...rest }: Props) {
  return (
    <h1
      {...rest}
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight",
        className,
      )}
    >
      {children}
    </h1>
  );
}
