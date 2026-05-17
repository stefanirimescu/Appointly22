import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import { ArrowLeft } from "lucide-react-native";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { TextField } from "@/components/ui/TextField";
import { colors } from "@/constants/colors";

export default function SignUp() {
  const router = useRouter();
  const { signUp, setActive, isLoaded } = useSignUp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onCreate() {
    if (!isLoaded) return;
    setError(null);
    setLoading(true);
    try {
      await signUp.create({ emailAddress: email, password });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "Sign up failed. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  async function onVerify() {
    if (!isLoaded) return;
    setError(null);
    setLoading(true);
    try {
      const attempt = await signUp.attemptEmailAddressVerification({ code });
      if (attempt.status === "complete") {
        await setActive({ session: attempt.createdSessionId });
        router.replace("/(tabs)");
      } else {
        setError("Verification incomplete. Please try a new code.");
      }
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "Invalid code. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <Pressable onPress={() => router.back()} className="mb-2 -ml-2 p-2">
          <ArrowLeft size={24} color={colors.text.primary} strokeWidth={1.75} />
        </Pressable>

        {pendingVerification ? (
          <>
            <SectionHeader
              title="Check your email"
              subtitle={`We sent a 6-digit code to ${email}.`}
            />
            <TextField
              label="Verification code"
              value={code}
              onChangeText={setCode}
              placeholder="123456"
              keyboardType="number-pad"
              maxLength={6}
            />
            {error ? (
              <Text className="mb-3 text-sm text-status-error">{error}</Text>
            ) : null}
            <PrimaryButton
              label="Verify"
              onPress={onVerify}
              loading={loading}
              disabled={code.length < 6}
              className="mt-2"
            />
          </>
        ) : (
          <>
            <SectionHeader
              title="Create your account"
              subtitle="Start organizing your bookings in minutes."
            />
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
              placeholder="At least 8 characters"
              secureTextEntry
              autoComplete="password-new"
            />
            {error ? (
              <Text className="mb-3 text-sm text-status-error">{error}</Text>
            ) : null}
            <PrimaryButton
              label="Create account"
              onPress={onCreate}
              loading={loading}
              disabled={!email || password.length < 8}
              className="mt-2"
            />

            <View className="mt-6 flex-row justify-center">
              <Text className="text-base text-ink-secondary">
                Already have an account?{" "}
              </Text>
              <Pressable onPress={() => router.replace("/(auth)/sign-in")}>
                <Text className="text-base font-semibold text-accent">
                  Sign in
                </Text>
              </Pressable>
            </View>
          </>
        )}
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
