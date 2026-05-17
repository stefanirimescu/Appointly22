import { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useSSO } from "@clerk/clerk-expo";
import * as AuthSession from "expo-auth-session";
import type { OAuthStrategy } from "@clerk/types";
import { Apple } from "lucide-react-native";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { colors } from "@/constants/colors";
import { cn } from "@/lib/cn";

type Props = {
  onError?: (message: string) => void;
};

export function SocialAuthButtons({ onError }: Props) {
  useWarmUpBrowser();
  const router = useRouter();
  const { startSSOFlow } = useSSO();
  const [activeStrategy, setActiveStrategy] = useState<OAuthStrategy | null>(
    null,
  );

  async function onStart(strategy: OAuthStrategy) {
    setActiveStrategy(strategy);
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy,
        redirectUrl: AuthSession.makeRedirectUri(),
      });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.replace("/(tabs)");
      }
    } catch (e) {
      const message =
        e instanceof Error
          ? e.message
          : "Sign-in was cancelled or failed. Please try again.";
      onError?.(message);
    } finally {
      setActiveStrategy(null);
    }
  }

  const isBusy = activeStrategy !== null;

  return (
    <View className="gap-3">
      <SocialButton
        label="Continue with Apple"
        variant="apple"
        loading={activeStrategy === "oauth_apple"}
        disabled={isBusy && activeStrategy !== "oauth_apple"}
        onPress={() => onStart("oauth_apple")}
      />
      <SocialButton
        label="Continue with Google"
        variant="google"
        loading={activeStrategy === "oauth_google"}
        disabled={isBusy && activeStrategy !== "oauth_google"}
        onPress={() => onStart("oauth_google")}
      />
    </View>
  );
}

type ButtonProps = {
  label: string;
  variant: "apple" | "google";
  onPress: () => void;
  loading: boolean;
  disabled: boolean;
};

function SocialButton({
  label,
  variant,
  onPress,
  loading,
  disabled,
}: ButtonProps) {
  const isApple = variant === "apple";

  return (
    <Pressable
      onPress={onPress}
      disabled={loading || disabled}
      className={cn(
        "h-14 flex-row items-center justify-center gap-3 rounded-2xl active:opacity-90",
        isApple ? "bg-ink-primary" : "border border-border bg-bg-card",
        (loading || disabled) && "opacity-50",
      )}
    >
      {loading ? (
        <ActivityIndicator color={isApple ? "#FFFFFF" : colors.text.primary} />
      ) : (
        <>
          {isApple ? (
            <Apple size={20} color="#FFFFFF" strokeWidth={1.5} />
          ) : (
            <GoogleGlyph />
          )}
          <Text
            className={cn(
              "text-base font-semibold",
              isApple ? "text-white" : "text-ink-primary",
            )}
          >
            {label}
          </Text>
        </>
      )}
    </Pressable>
  );
}

function GoogleGlyph() {
  return (
    <View className="h-5 w-5 items-center justify-center rounded-full">
      <Text className="text-base font-bold text-status-error">G</Text>
    </View>
  );
}

export function AuthDivider({ label = "or" }: { label?: string }) {
  return (
    <View className="my-5 flex-row items-center">
      <View className="h-px flex-1 bg-border" />
      <Text className="mx-3 text-sm text-ink-muted">{label}</Text>
      <View className="h-px flex-1 bg-border" />
    </View>
  );
}
