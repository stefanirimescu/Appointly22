import { Text, View } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { CalendarClock } from "lucide-react-native";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";

export default function Home() {
  const { user } = useUser();
  const greeting = getGreeting();
  const name = user?.firstName ?? "there";

  return (
    <ScreenContainer scroll>
      <View className="mb-6 mt-2">
        <Text className="text-base text-ink-secondary">{greeting},</Text>
        <Text className="mt-1 text-3xl font-bold text-ink-primary">
          {name}
        </Text>
        <Text className="mt-1 text-base text-ink-secondary">
          Here&apos;s your day
        </Text>
      </View>

      <Card className="mb-4">
        <Text className="text-sm text-ink-secondary">Today&apos;s revenue</Text>
        <Text className="mt-1 text-4xl font-bold text-ink-primary">€0</Text>
        <Text className="mt-1 text-sm text-ink-secondary">
          0 appointments completed
        </Text>
      </Card>

      <View className="mt-8 h-72">
        <EmptyState
          icon={CalendarClock}
          title="No appointments yet"
          description="Create your first booking and start organizing your day."
        />
      </View>
    </ScreenContainer>
  );
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}
