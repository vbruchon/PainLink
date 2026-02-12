import { View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { Text } from './text';

export const Header = ({ title }: { title: string }) => {
  return (
    <View className="flex-row items-center justify-center relative mb-8">
      <TouchableOpacity onPress={() => router.back()} className="absolute left-0">
        <ChevronLeft size={24} color="hsl(174 56% 14%)" />
      </TouchableOpacity>

      <Text variant="h1" className="text-primary text-center">
        {title}
      </Text>
    </View>
  );
};
