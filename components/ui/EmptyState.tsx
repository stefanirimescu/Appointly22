import { Text, View } from "react-native";
import type { LucideIcon } from "lucide-react-native";
import { colors } from "@/constants/colors";

type Props = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export function EmptyState({ icon: Icon, title, description }: Props) {
  return (
    <View className="flex-1 items-center justify-center px-8">
      <View className="mb-5 h-16 w-16 items-center justify-center rounded-full bg-accent-soft">
        <Icon size={28} color={colors.accent.primary} strokeWidth={1.5} />
      </View>
      <Text className="text-center text-lg font-semibold text-ink-primary">
        {title}
      </Text>
      <Text className="mt-2 text-center text-base leading-6 text-ink-secondary">
        {description}
      </Text>
    </View>
  );
}
