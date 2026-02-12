import { SafeAreaView } from 'react-native-safe-area-context';
import { clsx } from 'clsx';
import { ViewProps } from 'react-native';

type Props = ViewProps & {
  className?: string;
};

export const Screen = ({ className, ...props }: Props) => {
  return <SafeAreaView className={clsx('flex-1 bg-background p-4', className)} {...props} />;
};
