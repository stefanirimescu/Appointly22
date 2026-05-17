import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View } from "react-native";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  scroll?: boolean;
  className?: string;
};

export function ScreenContainer({ children, scroll = false, className }: Props) {
  const inner = (
    <View className={cn("flex-1 px-6 pt-2", className)}>{children}</View>
  );

  return (
    <SafeAreaView className="flex-1 bg-bg-primary" edges={["top", "left", "right"]}>
      {scroll ? (
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
        >
          {inner}
        </ScrollView>
      ) : (
        inner
      )}
    </SafeAreaView>
  );
}
