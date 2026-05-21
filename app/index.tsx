import { Redirect } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { ActivityIndicator, View } from "react-native";
import { colors } from "@/constants/colors";
import { useUserStore } from "@/store/userStore";

export default function Index() {
  const { isLoaded, isSignedIn } = useAuth();
  const profile = useUserStore((s) => s.profile);

  if (!isLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-bg-primary">
        <ActivityIndicator color={colors.accent.primary} />
      </View>
    );
  }

  if (!isSignedIn) {
    return <Redirect href="/(auth)/welcome" />;
  }

  if (!profile) {
    return <Redirect href="/(onboarding)/choose-profession" />;
  }

  return <Redirect href="/(tabs)" />;
}
