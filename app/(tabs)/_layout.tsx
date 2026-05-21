import { Redirect, Tabs } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import {
  BarChart3,
  Calendar,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react-native";
import { ActivityIndicator, View } from "react-native";
import { colors } from "@/constants/colors";
import { useUserStore } from "@/store/userStore";

export default function TabsLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const profile = useUserStore((s) => s.profile);

  if (!isLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-bg-primary">
        <ActivityIndicator color={colors.accent.primary} />
      </View>
    );
  }

  if (!isSignedIn) {
    return <Redirect href="/(auth)/welcome" />;
  }

  if (!profile) {
    return <Redirect href="/(onboarding)/choose-profession" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent.primary,
        tabBarInactiveTintColor: colors.text.muted,
        tabBarStyle: {
          backgroundColor: colors.background.card,
          borderTopColor: colors.border.default,
          borderTopWidth: 1,
          height: 84,
          paddingTop: 8,
          paddingBottom: 24,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "500",
        },
        sceneStyle: { backgroundColor: colors.background.primary },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <LayoutDashboard size={22} color={color} strokeWidth={1.75} />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendar",
          tabBarIcon: ({ color }) => (
            <Calendar size={22} color={color} strokeWidth={1.75} />
          ),
        }}
      />
      <Tabs.Screen
        name="clients"
        options={{
          title: "Clients",
          tabBarIcon: ({ color }) => (
            <Users size={22} color={color} strokeWidth={1.75} />
          ),
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: "Reports",
          tabBarIcon: ({ color }) => (
            <BarChart3 size={22} color={color} strokeWidth={1.75} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <Settings size={22} color={color} strokeWidth={1.75} />
          ),
        }}
      />
    </Tabs>
  );
}
