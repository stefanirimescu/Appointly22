import { useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { TextField } from "@/components/ui/TextField";
import { ProgressDots } from "@/components/ui/ProgressDots";
import { useOnboardingDraft } from "@/store/onboardingDraftStore";

export default function FirstServiceScreen() {
  const router = useRouter();
  const existing = useOnboardingDraft((s) => s.service);
  const setService = useOnboardingDraft((s) => s.setService);

  const [name, setName] = useState(existing?.name ?? "");
  const [duration, setDuration] = useState(
    existing?.duration ? String(existing.duration) : "",
  );
  const [price, setPrice] = useState(
    existing?.price !== undefined ? String(existing.price) : "",
  );

  const trimmedName = name.trim();
  const durationNum = Number(duration);
  const priceNum = Number(price);
  const canContinue =
    trimmedName.length > 0 &&
    Number.isFinite(durationNum) &&
    durationNum > 0 &&
    Number.isFinite(priceNum) &&
    priceNum >= 0;

  const onContinue = () => {
    if (!canContinue) return;
    setService({
      name: trimmedName,
      duration: durationNum,
      price: priceNum,
    });
    router.push("/(onboarding)/availability");
  };

  return (
    <ScreenContainer scroll>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ProgressDots step={3} />
        <SectionHeader
          title="Add your first service"
          subtitle="You can add more anytime."
        />

        <TextField
          label="Service name"
          placeholder="e.g. Haircut"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          returnKeyType="next"
        />

        <TextField
          label="Duration (minutes)"
          placeholder="30"
          value={duration}
          onChangeText={(v) => setDuration(v.replace(/[^0-9]/g, ""))}
          keyboardType="number-pad"
          returnKeyType="next"
        />

        <TextField
          label="Price (EUR)"
          placeholder="25"
          value={price}
          onChangeText={(v) => setPrice(v.replace(/[^0-9.]/g, ""))}
          keyboardType="decimal-pad"
          returnKeyType="done"
          onSubmitEditing={onContinue}
        />

        <View className="flex-1" />

        <View className="pb-6 pt-4">
          <PrimaryButton
            label="Continue"
            disabled={!canContinue}
            onPress={onContinue}
          />
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
