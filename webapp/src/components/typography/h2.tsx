import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface Props extends React.HTMLProps<HTMLHeadingElement> {
  children: ReactNode;
}
export default function Heading2({ children, className, ...rest }: Props) {
  return (
    <h2
      {...rest}
      className={cn(
        "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
        className,
      )}
    >
      {children}
    </h2>
  );
}
