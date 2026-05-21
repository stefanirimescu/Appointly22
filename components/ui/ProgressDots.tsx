import { View } from "react-native";
import { cn } from "@/lib/cn";

type Props = {
  step: number;
  total?: number;
  className?: string;
};

export function ProgressDots({ step, total = 4, className }: Props) {
  return (
    <View className={cn("mb-8 flex-row gap-2", className)}>
      {Array.from({ length: total }).map((_, i) => {
        const active = i < step;
        return (
          <View
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-full",
              active ? "bg-accent" : "bg-border",
            )}
          />
        );
      })}
    </View>
  );
}
