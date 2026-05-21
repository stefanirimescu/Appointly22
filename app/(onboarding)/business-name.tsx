import { KeyboardAvoidingView, Platform, View } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { TextField } from "@/components/ui/TextField";
import { ProgressDots } from "@/components/ui/ProgressDots";
import { useOnboardingDraft } from "@/store/onboardingDraftStore";

export default function BusinessNameScreen() {
  const router = useRouter();
  const businessName = useOnboardingDraft((s) => s.businessName);
  const setBusinessName = useOnboardingDraft((s) => s.setBusinessName);

  const trimmed = businessName.trim();
  const canContinue = trimmed.length > 0;

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ProgressDots step={2} />
        <SectionHeader
          title="What's your business called?"
          subtitle="You can change this later in Settings."
        />

        <TextField
          label="Business name"
          placeholder="e.g. Studio Calm"
          value={businessName}
          onChangeText={setBusinessName}
          autoFocus
          autoCapitalize="words"
          returnKeyType="done"
          onSubmitEditing={() => {
            if (canContinue) router.push("/(onboarding)/first-service");
          }}
        />

        <View className="flex-1" />

        <View className="pb-6 pt-4">
          <PrimaryButton
            label="Continue"
            disabled={!canContinue}
            onPress={() => router.push("/(onboarding)/first-service")}
          />
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
