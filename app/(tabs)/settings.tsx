import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useClerk, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { LogOut, User } from "lucide-react-native";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { colors } from "@/constants/colors";

export default function SettingsScreen() {
  const { signOut } = useClerk();
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSignOut() {
    setLoading(true);
    try {
      await signOut();
      router.replace("/(auth)/welcome");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScreenContainer scroll>
      <SectionHeader title="Settings" />

      <Card className="mb-4 flex-row items-center">
        <View className="mr-4 h-12 w-12 items-center justify-center rounded-full bg-accent-soft">
          <User size={22} color={colors.accent.primary} strokeWidth={1.5} />
        </View>
        <View className="flex-1">
          <Text className="text-base font-semibold text-ink-primary">
            {user?.firstName ?? "Your account"}
          </Text>
          <Text className="mt-0.5 text-sm text-ink-secondary">
            {user?.primaryEmailAddress?.emailAddress ?? ""}
          </Text>
        </View>
      </Card>

      <Pressable className="mb-8 active:opacity-80">
        <Card className="flex-row items-center">
          <Text className="flex-1 text-base text-ink-primary">
            Business profile
          </Text>
          <Text className="text-sm text-ink-muted">Coming soon</Text>
        </Card>
      </Pressable>

      <PrimaryButton
        label="Sign out"
        onPress={onSignOut}
        loading={loading}
        className="mt-4 bg-status-error"
      />

      <View className="mt-6 flex-row items-center justify-center gap-2">
        <LogOut size={14} color={colors.text.muted} />
        <Text className="text-sm text-ink-muted">
          You can sign back in anytime.
        </Text>
      </View>
    </ScreenContainer>
  );
}
