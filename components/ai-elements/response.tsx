// @ts-nocheck
// @ts-nocheck
"use client";
import { cn } from "@/lib/utils";
import { memo } from "react";
import { Streamdown } from "streamdown";

interface ResponseProps extends React.ComponentPropsWithoutRef<
  typeof Streamdown
> {
  className?: string;
}

export const Response = memo<ResponseProps>(
  ({ className, ...props }) => (
    <Streamdown
      className={cn(
        "size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
        className,
      )}
      {...props}
    />
  ),
  (prevProps, nextProps) => prevProps.children === nextProps.children,
);

Response.displayName = "Response";


