import "../global.css";
import { ClerkProvider } from "@clerk/clerk-expo";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as WebBrowser from "expo-web-browser";
import { Text, View } from "react-native";
import { tokenCache } from "@/lib/tokenCache";

WebBrowser.maybeCompleteAuthSession();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function RootLayout() {
  if (!publishableKey || publishableKey === "__SET_ME__") {
    return (
      <SafeAreaProvider>
        <View className="flex-1 items-center justify-center bg-bg-primary px-8">
          <Text className="mb-3 text-xl font-bold text-ink-primary">
            Missing Clerk publishable key
          </Text>
          <Text className="text-center text-base text-ink-secondary">
            Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file, then
            restart the dev server with `npx expo start --clear`.
          </Text>
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <SafeAreaProvider>
          <StatusBar style="dark" />
          <Slot />
        </SafeAreaProvider>
      </ClerkProvider>
    </GestureHandlerRootView>
  );
}
