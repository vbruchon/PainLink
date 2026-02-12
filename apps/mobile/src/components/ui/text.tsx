import { Text as RNText, TextProps } from 'react-native';
import { clsx } from 'clsx';

type TextVariant = 'h1' | 'h2' | 'h3' | 'body' | 'strong' | 'small' | 'caption';

type Props = TextProps & {
  variant?: TextVariant;
  className?: string;
};

export const Text = ({ variant = 'body', className, ...props }: Props) => {
  const variantClasses: Record<TextVariant, string> = {
    h1: 'text-[30px] leading-[34px] tracking-[-0.3px] font-bold text-secondary w-80',
    h2: 'text-[26px] leading-[28px] tracking-[-0.2px] font-semibold text-secondary',
    h3: 'text-[22px] leading-[24px] font-semibold text-secondary',
    body: 'text-base leading-[22px] text-text',
    strong: 'text-base leading-[22px] font-semibold text-text',
    small: 'text-[14px] leading-[20px] text-text',
    caption: 'text-caption leading-[16px] italic text-muted',
  };

  return <RNText className={clsx(variantClasses[variant], className)} {...props} />;
};
