import type { ReactNode } from "react";
import { ActivityIndicator, View } from "react-native";
import { useStoresHydrated } from "@/lib/useStoresHydrated";
import { colors } from "@/constants/colors";

type Props = {
  children: ReactNode;
};

export function HydrationGate({ children }: Props) {
  const hydrated = useStoresHydrated();

  if (!hydrated) {
    return (
      <View className="flex-1 items-center justify-center bg-bg-primary">
        <ActivityIndicator color={colors.accent.primary} />
      </View>
    );
  }

  return <>{children}</>;
}
