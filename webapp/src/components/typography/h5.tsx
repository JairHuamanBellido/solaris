import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface Props extends React.HTMLProps<HTMLHeadingElement> {
  children: ReactNode;
}

export default function Heading5({ children, className, ...rest }: Props) {
  return (
    <h5
      className={cn("text-base font-medium text-muted-foreground", className)}
      {...rest}
    >
      {children}
    </h5>
  );
}
