import { useRef, useState } from 'react';
import { View, TextInput } from 'react-native';
import { Link, router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Text } from '../ui/text';
import { Button } from '../ui/button';
import { Form } from '../ui/form/form';
import { FormField } from '../ui/form/form-field';

import { signInSchema, type SignInInput } from '@painlink/shared';
import { signIn } from '@/lib/auth/auth-client';
import { applyAuthError, toNetworkErrorMessage } from '@/lib/auth/error-mapping';
import { useAuth } from '@/providers/auth-provider';

export const SignInForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const { initSession } = useAuth();

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const form = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    setError,
    clearErrors,
    formState: { isSubmitting, isValid },
  } = form;

  const onSubmit = async (values: SignInInput) => {
    if (isSubmitting) return;

    setServerError(null);

    const payload = values;

    try {
      const res = await signIn.email(payload);

      if (res.error) {
        applyAuthError({ error: res.error, setError, setServerError });
        return;
      }
    } catch (e) {
      setServerError(toNetworkErrorMessage(e));
      return;
    }

    await initSession();
    router.replace('/(tabs)');
  };

  return (
    <Form form={form}>
      <View className="gap-5">
        <FormField
          control={form.control}
          name="email"
          label="Email :"
          placeholder="example@email.com"
          inputRef={emailRef}
          debounceClearErrorMs={250}
          onClearError={() => {
            clearErrors('email');
            setServerError(null);
          }}
          inputProps={{
            keyboardType: 'email-address',
            autoCapitalize: 'none',
            autoCorrect: false,

            textContentType: 'emailAddress',
            autoComplete: 'email',

            returnKeyType: 'next',
            blurOnSubmit: false,
            onSubmitEditing: () => passwordRef.current?.focus(),
          }}
        />

        <View className="gap-2">
          <FormField
            control={form.control}
            name="password"
            label="Mot de passe :"
            placeholder="••••••••"
            secure
            withPasswordToggle
            inputRef={passwordRef}
            debounceClearErrorMs={250}
            onClearError={() => {
              clearErrors('password');
              setServerError(null);
            }}
            inputProps={{
              textContentType: 'password',
              autoComplete: 'password',
              returnKeyType: 'done',
              onSubmitEditing: handleSubmit(onSubmit),
            }}
          />

          <Link href="/(auth)/forgot-password" className="self-end">
            <Text variant="caption">Mot de passe oublié ?</Text>
          </Link>
        </View>

        {serverError ? (
          <Text variant="caption" className="!text-destructive">
            {serverError}
          </Text>
        ) : null}

        <Button
          className="mt-4"
          size="lg"
          loading={isSubmitting}
          disabled={!isValid || isSubmitting}
          onPress={handleSubmit(onSubmit)}
        >
          Se connecter
        </Button>
      </View>
    </Form>
  );
};
