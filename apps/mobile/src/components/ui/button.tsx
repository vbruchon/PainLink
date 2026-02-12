import { Pressable, Text as RNText, ActivityIndicator } from 'react-native';
import { clsx } from 'clsx';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'social';
type ButtonSize = 'md' | 'lg';

type Props = {
  children: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
};

export const Button = ({
  children,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className,
}: Props) => {
  const base = 'items-center justify-center rounded-primary';

  const variants: Record<ButtonVariant, string> = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    ghost: 'bg-transparent',
    social: 'bg-primary/10',
  };

  const sizes: Record<ButtonSize, string> = {
    md: 'h-12 px-6',
    lg: 'h-14 px-8',
  };

  const textColor =
    variant === 'ghost' ? 'text-primary' : variant === 'social' ? 'text-primary' : 'text-white';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      className={clsx(
        base,
        variants[variant],
        sizes[size],
        (disabled || loading) && 'opacity-50',
        className,
      )}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <RNText className={clsx('font-semibold text-base', textColor)}>{children}</RNText>
      )}
    </Pressable>
  );
};
