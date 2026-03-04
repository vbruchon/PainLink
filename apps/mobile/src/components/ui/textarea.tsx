import { forwardRef } from 'react';
import { TextInput, View, type TextInputProps } from 'react-native';
import { clsx } from 'clsx';

type Props = TextInputProps & {
  error?: boolean;
  className?: string;
  containerClassName?: string;
  minHeight?: number;
};

export const TextArea = forwardRef<TextInput, Props>(function TextArea(
  { error = false, className, containerClassName, minHeight = 110, ...props },
  ref,
) {
  return (
    <View
      className={clsx(
        'rounded-primary border bg-surface px-4 py-3',
        error ? 'border-destructive' : 'border-border',
        containerClassName,
      )}
      style={{ minHeight }}
    >
      <TextInput
        ref={ref}
        className={clsx('flex-1 text-base text-text', className)}
        placeholderTextColor="hsl(240 4% 46%)"
        multiline
        textAlignVertical="top"
        {...props}
      />
    </View>
  );
});
