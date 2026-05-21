import { useMemo, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { useClerk, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Check, ChevronRight, LogOut, User, X } from "lucide-react-native";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { colors } from "@/constants/colors";
import { CURRENCIES, getCurrency } from "@/constants/currencies";
import { PROFESSIONS } from "@/constants/professions";
import { useUserStore } from "@/store/userStore";
import {
  usePreferencesStore,
  type WeekStartsOn,
} from "@/store/preferencesStore";
import { resetAllStores } from "@/store/resetAllStores";
import { cn } from "@/lib/cn";

export default function SettingsScreen() {
  const { signOut } = useClerk();
  const { user } = useUser();
  const router = useRouter();
  const profile = useUserStore((s) => s.profile);

  const currency = usePreferencesStore((s) => s.currency);
  const setCurrency = usePreferencesStore((s) => s.setCurrency);
  const weekStartsOn = usePreferencesStore((s) => s.weekStartsOn);
  const setWeekStartsOn = usePreferencesStore((s) => s.setWeekStartsOn);
  const defaultAppointmentMinutes = usePreferencesStore(
    (s) => s.defaultAppointmentMinutes,
  );
  const setDefaultAppointmentMinutes = usePreferencesStore(
    (s) => s.setDefaultAppointmentMinutes,
  );
  const appointmentRemindersEnabled = usePreferencesStore(
    (s) => s.appointmentRemindersEnabled,
  );
  const setAppointmentRemindersEnabled = usePreferencesStore(
    (s) => s.setAppointmentRemindersEnabled,
  );

  const [signingOut, setSigningOut] = useState(false);
  const [currencyPickerOpen, setCurrencyPickerOpen] = useState(false);
  const [durationDraft, setDurationDraft] = useState(
    String(defaultAppointmentMinutes),
  );

  const professionLabel = useMemo(() => {
    if (!profile) return "";
    return (
      PROFESSIONS.find((p) => p.id === profile.profession)?.label ??
      profile.profession
    );
  }, [profile]);

  const currencyInfo = getCurrency(currency);

  async function onSignOut() {
    setSigningOut(true);
    try {
      resetAllStores();
      await signOut();
      router.replace("/(auth)/welcome");
    } finally {
      setSigningOut(false);
    }
  }

  function commitDuration() {
    const n = Number(durationDraft);
    if (Number.isFinite(n) && n > 0 && n <= 600) {
      setDefaultAppointmentMinutes(Math.round(n));
    } else {
      setDurationDraft(String(defaultAppointmentMinutes));
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

      {profile ? (
        <View className="mb-8">
          <Text className="mb-2 px-1 text-xs font-medium uppercase tracking-wide text-ink-muted">
            Business profile
          </Text>
          <Card>
            <SettingRow label="Business name" value={profile.businessName} />
            <Divider />
            <SettingRow label="Profession" value={professionLabel} last />
          </Card>
        </View>
      ) : null}

      <Text className="mb-2 px-1 text-xs font-medium uppercase tracking-wide text-ink-muted">
        Preferences
      </Text>
      <Card className="mb-8 p-0">
        <Pressable
          onPress={() => setCurrencyPickerOpen(true)}
          className="flex-row items-center justify-between px-5 py-4 active:opacity-70"
        >
          <Text className="text-base text-ink-primary">Currency</Text>
          <View className="flex-row items-center gap-2">
            <Text className="text-base text-ink-secondary">
              {currencyInfo.code} ({currencyInfo.symbol})
            </Text>
            <ChevronRight size={18} color={colors.text.muted} strokeWidth={1.75} />
          </View>
        </Pressable>

        <Divider />

        <View className="px-5 py-4">
          <Text className="mb-3 text-base text-ink-primary">Week starts on</Text>
          <View className="flex-row gap-2">
            <WeekToggle
              label="Monday"
              active={weekStartsOn === "monday"}
              onPress={() => setWeekStartsOn("monday")}
            />
            <WeekToggle
              label="Sunday"
              active={weekStartsOn === "sunday"}
              onPress={() => setWeekStartsOn("sunday")}
            />
          </View>
        </View>

        <Divider />

        <View className="flex-row items-center justify-between px-5 py-4">
          <Text className="flex-1 text-base text-ink-primary">
            Default appointment{"\n"}length (minutes)
          </Text>
          <TextInput
            value={durationDraft}
            onChangeText={(v) => setDurationDraft(v.replace(/[^0-9]/g, ""))}
            onBlur={commitDuration}
            onSubmitEditing={commitDuration}
            keyboardType="number-pad"
            returnKeyType="done"
            placeholderTextColor={colors.text.muted}
            className="h-11 w-20 rounded-xl border border-border bg-bg-primary px-3 text-right text-base text-ink-primary"
          />
        </View>

        <Divider />

        <View className="flex-row items-center justify-between px-5 py-4">
          <View className="flex-1 pr-4">
            <Text className="text-base text-ink-primary">
              Appointment reminders
            </Text>
            <Text className="mt-0.5 text-sm text-ink-secondary">
              Get notified before each appointment.
            </Text>
          </View>
          <Switch
            value={appointmentRemindersEnabled}
            onValueChange={setAppointmentRemindersEnabled}
            trackColor={{
              false: colors.border.default,
              true: colors.accent.primary,
            }}
            thumbColor="#FFFFFF"
          />
        </View>
      </Card>

      <PrimaryButton
        label="Sign out"
        onPress={onSignOut}
        loading={signingOut}
        className="bg-status-error"
      />

      <View className="mt-6 flex-row items-center justify-center gap-2">
        <LogOut size={14} color={colors.text.muted} />
        <Text className="text-sm text-ink-muted">
          You can sign back in anytime.
        </Text>
      </View>

      <CurrencyPickerModal
        visible={currencyPickerOpen}
        selected={currency}
        onClose={() => setCurrencyPickerOpen(false)}
        onSelect={(code) => {
          setCurrency(code);
          setCurrencyPickerOpen(false);
        }}
      />
    </ScreenContainer>
  );
}

function SettingRow({
  label,
  value,
  last,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <View className={cn("flex-row items-center justify-between", !last && "pb-3")}>
      <Text className="text-sm text-ink-secondary">{label}</Text>
      <Text className="text-base font-medium text-ink-primary">{value}</Text>
    </View>
  );
}

function Divider() {
  return <View className="h-px bg-border-divider" />;
}

function WeekToggle({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        "h-11 flex-1 items-center justify-center rounded-xl border active:opacity-90",
        active
          ? "border-accent bg-accent-soft"
          : "border-border bg-bg-primary",
      )}
    >
      <Text
        className={cn(
          "text-base",
          active ? "font-semibold text-ink-primary" : "text-ink-primary",
        )}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function CurrencyPickerModal({
  visible,
  selected,
  onClose,
  onSelect,
}: {
  visible: boolean;
  selected: string;
  onClose: () => void;
  onSelect: (code: string) => void;
}) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/40">
        <View className="rounded-t-3xl bg-bg-card pb-8 pt-3">
          <View className="mb-2 flex-row items-center justify-between px-5 py-2">
            <Text className="text-lg font-semibold text-ink-primary">
              Choose currency
            </Text>
            <Pressable onPress={onClose} className="p-1 active:opacity-70">
              <X size={22} color={colors.text.secondary} strokeWidth={1.75} />
            </Pressable>
          </View>
          <ScrollView className="max-h-96">
            {CURRENCIES.map((c) => {
              const active = c.code === selected;
              return (
                <Pressable
                  key={c.code}
                  onPress={() => onSelect(c.code)}
                  className={cn(
                    "flex-row items-center justify-between px-5 py-4 active:opacity-70",
                  )}
                >
                  <View>
                    <Text className="text-base text-ink-primary">
                      {c.label}
                    </Text>
                    <Text className="mt-0.5 text-sm text-ink-secondary">
                      {c.code} · {c.symbol}
                    </Text>
                  </View>
                  {active ? (
                    <Check
                      size={20}
                      color={colors.accent.primary}
                      strokeWidth={2.25}
                    />
                  ) : null}
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
