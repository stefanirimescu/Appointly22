import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Check } from "lucide-react-native";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { ProgressDots } from "@/components/ui/ProgressDots";
import { PROFESSIONS } from "@/constants/professions";
import { useOnboardingDraft } from "@/store/onboardingDraftStore";
import { colors } from "@/constants/colors";
import { cn } from "@/lib/cn";

export default function ChooseProfessionScreen() {
  const router = useRouter();
  const profession = useOnboardingDraft((s) => s.profession);
  const setProfession = useOnboardingDraft((s) => s.setProfession);

  return (
    <ScreenContainer>
      <ProgressDots step={1} />
      <SectionHeader
        title="What do you do?"
        subtitle="This helps us tailor your workspace."
      />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-3">
          {PROFESSIONS.map((p) => {
            const selected = profession === p.id;
            return (
              <Pressable
                key={p.id}
                onPress={() => setProfession(p.id)}
                className={cn(
                  "h-14 flex-row items-center justify-between rounded-2xl border bg-bg-card px-5 active:opacity-90",
                  selected
                    ? "border-accent bg-accent-soft"
                    : "border-border",
                )}
              >
                <Text
                  className={cn(
                    "text-base",
                    selected
                      ? "font-semibold text-ink-primary"
                      : "text-ink-primary",
                  )}
                >
                  {p.label}
                </Text>
                {selected ? (
                  <Check size={20} color={colors.accent.primary} strokeWidth={2.25} />
                ) : null}
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <View className="pb-6 pt-4">
        <PrimaryButton
          label="Continue"
          disabled={!profession}
          onPress={() => router.push("/(onboarding)/business-name")}
        />
      </View>
    </ScreenContainer>
  );
}
