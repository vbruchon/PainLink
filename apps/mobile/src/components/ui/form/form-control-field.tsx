import { View } from 'react-native';
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
  type RegisterOptions,
} from 'react-hook-form';

import { Text } from '../text';

type RenderArgs<V> = {
  value: V;
  onChange: (v: V) => void;
  onBlur: () => void;
  errorMessage: string | null;
};

type Props<T extends FieldValues, V = any> = {
  control: Control<T>;
  name: Path<T>;

  label?: string;
  helperText?: string;

  className?: string;
  errorClassName?: string;

  rules?: RegisterOptions<T>;
  render: (args: RenderArgs<V>) => React.ReactNode;
};

export const FormControlField = <T extends FieldValues, V = any>({
  control,
  name,
  label,
  helperText,
  className,
  errorClassName,
  rules,
  render,
}: Props<T, V>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => {
        const errorMessage = error?.message ?? null;

        return (
          <View className={className ?? 'gap-2'}>
            {label ? (
              <Text variant="small" className="font-semibold">
                {label}
              </Text>
            ) : null}

            {render({
              value: value as V,
              onChange: onChange as unknown as (v: V) => void,
              onBlur,
              errorMessage,
            })}

            {errorMessage ? (
              <Text variant="caption" className={errorClassName ?? '!text-destructive'}>
                {errorMessage}
              </Text>
            ) : helperText ? (
              <Text variant="caption">{helperText}</Text>
            ) : null}
          </View>
        );
      }}
    />
  );
};
