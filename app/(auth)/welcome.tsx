import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import { CalendarCheck } from "lucide-react-native";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { colors } from "@/constants/colors";

export default function Welcome() {
  const router = useRouter();

  return (
    <ScreenContainer>
      <View className="flex-1 justify-between pt-12 pb-6">
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

        <View className="gap-3">
          <PrimaryButton
            label="Create account"
            onPress={() => router.push("/(auth)/sign-up")}
          />
          <SecondaryButton
            label="Sign in"
            onPress={() => router.push("/(auth)/sign-in")}
          />
        </View>
      </View>
    </ScreenContainer>
  );
}
