import { ActivityIndicator, Pressable, Text } from "react-native";
import { cn } from "@/lib/cn";

type Props = {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
};

export function PrimaryButton({
  label,
  onPress,
  loading = false,
  disabled = false,
  className,
}: Props) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      className={cn(
        "h-14 items-center justify-center rounded-2xl bg-accent active:opacity-90",
        isDisabled && "opacity-50",
        className,
      )}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text className="text-base font-semibold text-white">{label}</Text>
      )}
    </Pressable>
  );
}
