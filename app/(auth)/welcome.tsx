import { useState } from "react";
import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import { CalendarCheck } from "lucide-react-native";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import {
  AuthDivider,
  SocialAuthButtons,
} from "@/components/auth/SocialAuthButtons";
import { colors } from "@/constants/colors";

export default function Welcome() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  return (
    <ScreenContainer scroll>
      <View className="flex-1 pt-12 pb-6">
        <View className="items-start">
          <View className="mb-8 h-16 w-16 items-center justify-center rounded-2xl bg-accent-soft">
            <CalendarCheck
              size={32}
              color={colors.accent.primary}
              strokeWidth={1.5}
            />
          </View>
          <Text className="text-4xl font-bold leading-tight text-ink-primary">
            Your schedule, clients, and income in one calm place.
          </Text>
          <Text className="mt-4 text-lg leading-7 text-ink-secondary">
            Appointly helps independent professionals organize their day and
            understand their business with confidence.
          </Text>
        </View>

        <View className="mt-12 gap-3">
          <SocialAuthButtons onError={setError} />
          <AuthDivider />
          <PrimaryButton
            label="Create account with email"
            onPress={() => router.push("/(auth)/sign-up")}
          />
          <SecondaryButton
            label="Sign in"
            onPress={() => router.push("/(auth)/sign-in")}
          />

          {error ? (
            <Text className="mt-2 text-center text-sm text-status-error">
              {error}
            </Text>
          ) : null}
        </View>
      </View>
    </ScreenContainer>
  );
}
