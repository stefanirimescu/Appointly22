import { View } from "react-native";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: Props) {
  return (
    <View
      className={cn(
        "rounded-card border border-border bg-bg-card p-5",
        className,
      )}
    >
      {children}
    </View>
  );
}
