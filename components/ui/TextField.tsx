import { Text, TextInput, View } from "react-native";
import { forwardRef } from "react";
import type { TextInputProps } from "react-native";
import { cn } from "@/lib/cn";
import { colors } from "@/constants/colors";

type Props = TextInputProps & {
  label: string;
  error?: string;
  containerClassName?: string;
};

export const TextField = forwardRef<TextInput, Props>(function TextField(
  { label, error, containerClassName, className, ...rest },
  ref,
) {
  return (
    <View className={cn("mb-4", containerClassName)}>
      <Text className="mb-2 text-sm font-medium text-ink-primary">{label}</Text>
      <TextInput
        ref={ref}
        placeholderTextColor={colors.text.muted}
        className={cn(
          "h-14 rounded-2xl border border-border bg-bg-card px-4 text-base text-ink-primary",
          error && "border-status-error",
          className,
        )}
        {...rest}
      />
      {error ? (
        <Text className="mt-1.5 text-sm text-status-error">{error}</Text>
      ) : null}
    </View>
  );
});
