import { useEffect, useRef } from 'react';
import { View, type TextInput, type TextInputProps } from 'react-native';
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';

import { Text } from '../text';
import { Input } from '../input';

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  helperText?: string;
  inputProps?: TextInputProps;
  inputRef?: React.Ref<TextInput>;
  secure?: boolean;
  withPasswordToggle?: boolean;
  className?: string;
  errorClassName?: string;

  // ✅ new
  debounceClearErrorMs?: number; // ex: 250
  onClearError?: () => void; // pour aussi clear serverError côté form
};

export const FormField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  helperText,
  inputProps,
  inputRef,
  secure = false,
  withPasswordToggle = false,
  className,
  errorClassName,
  debounceClearErrorMs,
  onClearError,
}: Props<T>) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => {
        const { onChangeText: inputOnChangeText, ...restInputProps } = inputProps ?? {};

        const scheduleClear = () => {
          if (!debounceClearErrorMs) return;
          if (timerRef.current) clearTimeout(timerRef.current);
          timerRef.current = setTimeout(() => {
            onClearError?.();
          }, debounceClearErrorMs);
        };

        return (
          <View className={className ?? 'gap-2'}>
            <Text variant="small" className="font-semibold">
              {label}
            </Text>

            <Input
              ref={inputRef}
              {...restInputProps}
              placeholder={placeholder}
              value={typeof value === 'string' ? value : value == null ? '' : String(value)}
              onBlur={onBlur}
              error={!!error}
              secureTextEntry={secure}
              withPasswordToggle={withPasswordToggle}
              onChangeText={(t) => {
                // 1) normal user handler
                inputOnChangeText?.(t);

                // 2) if there is an error showing, debounce clearing it (form-level + server-level)
                if (error?.message && debounceClearErrorMs) scheduleClear();

                // 3) update RHF
                onChange(t);
              }}
            />

            {error?.message ? (
              <Text variant="caption" className={errorClassName}>
                {error.message}
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

// import React from 'react';
// import { View, type TextInputProps } from 'react-native';
// import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';

// import { Text } from '@/components/ui/text';
// import { Input } from '@/components/ui/input';

// type Props<T extends FieldValues> = {
//   control: Control<T>;
//   name: Path<T>;
//   label: string;
//   placeholder?: string;
//   helperText?: string;
//   inputProps?: TextInputProps;
//   secure?: boolean;
//   withPasswordToggle?: boolean;
//   className?: string;
//   errorClassName?: string;
// };

// export const FormField = <T extends FieldValues>({
//   control,
//   name,
//   label,
//   placeholder,
//   helperText,
//   inputProps,
//   secure = false,
//   withPasswordToggle = false,
//   className,
//   errorClassName,
// }: Props<T>) => {
//   return (
//     <Controller
//       control={control}
//       name={name}
//       render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => {
//         const { onChangeText: inputOnChangeText, ...restInputProps } = inputProps ?? {};

//         return (
//           <View className={className ?? 'gap-2'}>
//             <Text variant="small" className="font-semibold">
//               {label}
//             </Text>

//             <Input
//               {...restInputProps}
//               placeholder={placeholder}
//               value={typeof value === 'string' ? value : value == null ? '' : String(value)}
//               onBlur={onBlur}
//               error={!!error}
//               secureTextEntry={secure}
//               withPasswordToggle={withPasswordToggle}
//               onChangeText={(t) => {
//                 inputOnChangeText?.(t);
//                 onChange(t);
//               }}
//             />

//             {error?.message ? (
//               <Text variant="caption" className={errorClassName}>
//                 {error.message}
//               </Text>
//             ) : helperText ? (
//               <Text variant="caption">{helperText}</Text>
//             ) : null}
//           </View>
//         );
//       }}
//     />
//   );
// };
