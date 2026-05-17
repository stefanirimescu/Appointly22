import { Pressable, Text } from "react-native";
import { cn } from "@/lib/cn";

type Props = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  className?: string;
};

export function SecondaryButton({
  label,
  onPress,
  disabled = false,
  className,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={cn(
        "h-14 items-center justify-center rounded-2xl border border-border bg-bg-card active:opacity-80",
        disabled && "opacity-50",
        className,
      )}
    >
      <Text className="text-base font-semibold text-ink-primary">{label}</Text>
    </Pressable>
  );
}
