import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";
import { ArrowLeft } from "lucide-react-native";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { TextField } from "@/components/ui/TextField";
import {
  AuthDivider,
  SocialAuthButtons,
} from "@/components/auth/SocialAuthButtons";
import { colors } from "@/constants/colors";

export default function SignIn() {
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit() {
    if (!isLoaded) return;
    setError(null);
    setLoading(true);
    try {
      const attempt = await signIn.create({ identifier: email, password });
      if (attempt.status === "complete") {
        await setActive({ session: attempt.createdSessionId });
        router.replace("/(tabs)");
      } else {
        setError("Additional verification required. Please try again.");
      }
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "Sign in failed. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScreenContainer scroll>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <Pressable onPress={() => router.back()} className="mb-2 -ml-2 p-2">
          <ArrowLeft size={24} color={colors.text.primary} strokeWidth={1.75} />
        </Pressable>

        <SectionHeader
          title="Welcome back"
          subtitle="Sign in to your Appointly account."
        />

        <SocialAuthButtons onError={setError} />
        <AuthDivider />

        <TextField
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="you@email.com"
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
        />

        <TextField
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Your password"
          secureTextEntry
          autoComplete="password"
        />

        {error ? (
          <Text className="mb-3 text-sm text-status-error">{error}</Text>
        ) : null}

        <PrimaryButton
          label="Sign in"
          onPress={onSubmit}
          loading={loading}
          disabled={!email || !password}
          className="mt-2"
        />

        <View className="mt-6 flex-row justify-center">
          <Text className="text-base text-ink-secondary">
            No account yet?{" "}
          </Text>
          <Pressable onPress={() => router.replace("/(auth)/sign-up")}>
            <Text className="text-base font-semibold text-accent">
              Create one
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
