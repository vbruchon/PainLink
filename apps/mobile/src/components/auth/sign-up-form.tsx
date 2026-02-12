import { useRef, useState } from 'react';
import { View, TextInput } from 'react-native';
import { router } from 'expo-router';
import * as Linking from 'expo-linking';

import { Text } from '../ui/text';
import { Button } from '../ui/button';
import { Form } from '../ui/form/form';
import { FormField } from '../ui/form/form-field';

import { signUp } from '@/lib/auth/auth-client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema, type SignUpInput } from '@painlink/shared';
import { applyAuthError, toNetworkErrorMessage } from '@/lib/auth/error-mapping';
import { useAuth } from '@/providers/auth-provider';

export const SignUpForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const { initSession } = useAuth();

  const nameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const form = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: '', email: '', password: '' },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    setError,
    clearErrors,
    formState: { isSubmitting, isValid },
  } = form;

  const onSubmit = async (values: SignUpInput) => {
    setServerError(null);

    const payload = signUpSchema.parse(values);
    const callbackURL = Linking.createURL('/(tabs)');

    try {
      const res = await signUp.email({
        ...payload,
        callbackURL,
      });

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
          name="name"
          label="Prénom :"
          placeholder="Nexi"
          inputRef={nameRef}
          debounceClearErrorMs={250}
          onClearError={() => {
            clearErrors('name');
            setServerError(null);
          }}
          inputProps={{
            autoCapitalize: 'words',
            autoCorrect: false,

            textContentType: 'givenName',
            autoComplete: 'name',

            returnKeyType: 'next',
            blurOnSubmit: false,
            onSubmitEditing: () => emailRef.current?.focus(),
          }}
        />

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
            textContentType: 'newPassword',
            autoComplete: 'new-password',

            returnKeyType: 'done',
            blurOnSubmit: true,
            onSubmitEditing: handleSubmit(onSubmit),
          }}
        />

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
          S’inscrire
        </Button>
      </View>
    </Form>
  );
};
