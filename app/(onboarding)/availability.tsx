import { useMemo, useState } from "react";
import { Platform, Pressable, ScrollView, Switch, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import DateTimePicker, {
  DateTimePickerAndroid,
  type DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { ProgressDots } from "@/components/ui/ProgressDots";
import { useOnboardingDraft } from "@/store/onboardingDraftStore";
import { useUserStore } from "@/store/userStore";
import { useServiceStore } from "@/store/serviceStore";
import { useAvailabilityStore } from "@/store/availabilityStore";
import { usePreferencesStore } from "@/store/preferencesStore";
import { randomId } from "@/utils/id";
import { colors } from "@/constants/colors";
import { cn } from "@/lib/cn";
import type { AvailabilityDay, WeekDay } from "@/types/availability";

const WEEK: { day: WeekDay; label: string; defaultOn: boolean }[] = [
  { day: "monday", label: "Monday", defaultOn: true },
  { day: "tuesday", label: "Tuesday", defaultOn: true },
  { day: "wednesday", label: "Wednesday", defaultOn: true },
  { day: "thursday", label: "Thursday", defaultOn: true },
  { day: "friday", label: "Friday", defaultOn: true },
  { day: "saturday", label: "Saturday", defaultOn: false },
  { day: "sunday", label: "Sunday", defaultOn: false },
];

function buildDefaultDays(): AvailabilityDay[] {
  return WEEK.map(({ day, defaultOn }) => ({
    day,
    isWorking: defaultOn,
    startTime: "09:00",
    endTime: "17:00",
  }));
}

function formatHM(date: Date): string {
  const h = String(date.getHours()).padStart(2, "0");
  const m = String(date.getMinutes()).padStart(2, "0");
  return `${h}:${m}`;
}

function parseHM(value: string): Date {
  const [h, m] = value.split(":").map((n) => Number(n));
  const d = new Date();
  d.setHours(Number.isFinite(h) ? h : 9, Number.isFinite(m) ? m : 0, 0, 0);
  return d;
}

type Edge = "startTime" | "endTime";

export default function AvailabilityScreen() {
  const router = useRouter();
  const { user } = useUser();
  const draftAvailability = useOnboardingDraft((s) => s.availability);
  const profession = useOnboardingDraft((s) => s.profession);
  const businessName = useOnboardingDraft((s) => s.businessName);
  const serviceDraft = useOnboardingDraft((s) => s.service);
  const setDraftAvailability = useOnboardingDraft((s) => s.setAvailability);
  const reset = useOnboardingDraft((s) => s.reset);

  const initialDays = useMemo<AvailabilityDay[]>(
    () => draftAvailability?.days ?? buildDefaultDays(),
    [draftAvailability],
  );
  const [days, setDays] = useState<AvailabilityDay[]>(initialDays);
  const [editing, setEditing] = useState<{ day: WeekDay; edge: Edge } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const labelByDay = useMemo(
    () => Object.fromEntries(WEEK.map((w) => [w.day, w.label])) as Record<WeekDay, string>,
    [],
  );

  function updateDay(day: WeekDay, patch: Partial<AvailabilityDay>) {
    setDays((prev) => prev.map((d) => (d.day === day ? { ...d, ...patch } : d)));
  }

  function openPicker(day: WeekDay, edge: Edge) {
    const current = days.find((d) => d.day === day);
    if (!current) return;
    const value = parseHM(edge === "startTime" ? current.startTime : current.endTime);

    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        value,
        mode: "time",
        is24Hour: true,
        onChange: (event: DateTimePickerEvent, date?: Date) => {
          if (event.type === "set" && date) {
            updateDay(day, { [edge]: formatHM(date) });
          }
        },
      });
    } else {
      setEditing({ day, edge });
    }
  }

  function onIOSChange(_: DateTimePickerEvent, date?: Date) {
    if (!editing || !date) return;
    updateDay(editing.day, { [editing.edge]: formatHM(date) });
  }

  const canFinish = days.some((d) => d.isWorking) && !!user && !submitting;

  const onFinish = () => {
    if (!user || !profession || !serviceDraft) return;
    setSubmitting(true);
    const now = new Date().toISOString();
    const availability = { days };

    setDraftAvailability(availability);

    useUserStore.getState().setProfile({
      id: user.id,
      fullName:
        user.fullName ??
        (`${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || ""),
      businessName,
      profession,
      currency: usePreferencesStore.getState().currency,
      createdAt: now,
      updatedAt: now,
    });

    useServiceStore.getState().addService({
      id: randomId(),
      name: serviceDraft.name,
      duration: serviceDraft.duration,
      price: serviceDraft.price,
      createdAt: now,
      updatedAt: now,
    });

    useAvailabilityStore.getState().setAvailability(availability);
    reset();

    router.replace("/(tabs)");
  };

  return (
    <ScreenContainer>
      <ProgressDots step={4} />
      <SectionHeader
        title="When are you open?"
        subtitle="Set your working hours. You can adjust this later."
      />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-3">
          {days.map((d) => (
            <View
              key={d.day}
              className="rounded-2xl border border-border bg-bg-card p-4"
            >
              <View className="flex-row items-center justify-between">
                <Text className="text-base font-semibold text-ink-primary">
                  {labelByDay[d.day]}
                </Text>
                <Switch
                  value={d.isWorking}
                  onValueChange={(v) => updateDay(d.day, { isWorking: v })}
                  trackColor={{
                    false: colors.border.default,
                    true: colors.accent.primary,
                  }}
                  thumbColor="#FFFFFF"
                />
              </View>

              {d.isWorking ? (
                <View className="mt-3 flex-row gap-3">
                  <Pressable
                    onPress={() => openPicker(d.day, "startTime")}
                    className={cn(
                      "h-12 flex-1 items-center justify-center rounded-xl border border-border bg-bg-primary active:opacity-90",
                    )}
                  >
                    <Text className="text-xs text-ink-secondary">Start</Text>
                    <Text className="text-base font-medium text-ink-primary">
                      {d.startTime}
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => openPicker(d.day, "endTime")}
                    className={cn(
                      "h-12 flex-1 items-center justify-center rounded-xl border border-border bg-bg-primary active:opacity-90",
                    )}
                  >
                    <Text className="text-xs text-ink-secondary">End</Text>
                    <Text className="text-base font-medium text-ink-primary">
                      {d.endTime}
                    </Text>
                  </Pressable>
                </View>
              ) : (
                <Text className="mt-2 text-sm text-ink-secondary">Closed</Text>
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      {Platform.OS === "ios" && editing ? (
        <View className="rounded-2xl border border-border bg-bg-card p-3">
          <View className="flex-row items-center justify-between px-2 pb-1">
            <Text className="text-sm text-ink-secondary">
              {labelByDay[editing.day]} ·{" "}
              {editing.edge === "startTime" ? "Start" : "End"}
            </Text>
            <Pressable onPress={() => setEditing(null)} className="px-2 py-1">
              <Text className="text-base font-semibold text-accent">Done</Text>
            </Pressable>
          </View>
          <DateTimePicker
            value={parseHM(
              days.find((d) => d.day === editing.day)?.[editing.edge] ?? "09:00",
            )}
            mode="time"
            display="spinner"
            is24Hour
            onChange={onIOSChange}
          />
        </View>
      ) : null}

      <View className="pb-6 pt-4">
        <PrimaryButton
          label="Finish setup"
          loading={submitting}
          disabled={!canFinish}
          onPress={onFinish}
        />
      </View>
    </ScreenContainer>
  );
}
