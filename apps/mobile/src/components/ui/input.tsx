import { forwardRef, useState } from 'react';
import { TextInput, View, TextInputProps, Pressable } from 'react-native';
import { clsx } from 'clsx';
import { Eye, EyeOff } from 'lucide-react-native';

type Props = TextInputProps & {
  error?: boolean;
  withPasswordToggle?: boolean;
  className?: string;
};

export const Input = forwardRef<TextInput, Props>(function Input(
  { error = false, withPasswordToggle = false, secureTextEntry, className, ...props },
  ref,
) {
  const [hidden, setHidden] = useState(!!secureTextEntry);

  return (
    <View
      className={clsx(
        'flex-row items-center rounded-primary border px-4 h-12 bg-surface',
        error ? 'border-destructive' : 'border-border',
        className,
      )}
    >
      <TextInput
        ref={ref}
        className="flex-1 text-base text-text"
        placeholderTextColor="hsl(240 4% 46%)"
        secureTextEntry={hidden}
        // a11y / UX defaults safe:
        autoCorrect={props.autoCorrect ?? false}
        {...props}
      />

      {withPasswordToggle && (
        <Pressable
          onPress={() => setHidden((v) => !v)}
          accessibilityRole="button"
          accessibilityLabel={hidden ? 'Afficher le mot de passe' : 'Masquer le mot de passe'}
          hitSlop={10}
        >
          {hidden ? (
            <Eye size={18} color="hsl(240 4% 46%)" />
          ) : (
            <EyeOff size={18} color="hsl(240 4% 46%)" />
          )}
        </Pressable>
      )}
    </View>
  );
});

// import { TextInput, View, TextInputProps, Pressable } from 'react-native';
// import { clsx } from 'clsx';
// import { Eye, EyeOff } from 'lucide-react-native';
// import { useState } from 'react';

// type Props = TextInputProps & {
//   error?: boolean;
//   withPasswordToggle?: boolean;
//   className?: string;
// };

// export const Input = ({
//   error = false,
//   withPasswordToggle = false,
//   secureTextEntry,
//   className,
//   ...props
// }: Props) => {
//   const [hidden, setHidden] = useState(secureTextEntry);

//   return (
//     <View
//       className={clsx(
//         'flex-row items-center rounded-primary border px-4 h-12 bg-surface',
//         error ? 'border-destructive' : 'border-border',
//         className,
//       )}
//     >
//       <TextInput
//         className="flex-1 text-base text-text"
//         placeholderTextColor="hsl(240 4% 46%)"
//         secureTextEntry={hidden}
//         {...props}
//       />

//       {withPasswordToggle && (
//         <Pressable onPress={() => setHidden(!hidden)}>
//           {hidden ? (
//             <Eye size={18} color="hsl(240 4% 46%)" />
//           ) : (
//             <EyeOff size={18} color="hsl(240 4% 46%)" />
//           )}
//         </Pressable>
//       )}
//     </View>
//   );
// };
