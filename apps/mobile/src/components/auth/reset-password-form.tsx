import { useMemo, useRef, useState } from 'react';
import { View, TextInput } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { Text } from '../ui/text';
import { Button } from '../ui/button';
import { Form } from '../ui/form/form';
import { FormField } from '../ui/form/form-field';

import { authClient } from '@/lib/auth/auth-client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema, type ResetPasswordInput } from '@painlink/shared';
import { applyAuthError, toNetworkErrorMessage } from '@/lib/auth/error-mapping';

export const ResetPasswordForm = () => {
  const params = useLocalSearchParams<{ token?: string; error?: string }>();

  const token = useMemo(
    () => (typeof params.token === 'string' ? params.token : ''),
    [params.token],
  );

  const [serverError, setServerError] = useState<string | null>(() => {
    if (params.error === 'INVALID_TOKEN') {
      return 'Lien expiré ou invalide. Redemande un nouveau lien.';
    }
    return null;
  });

  const passwordRef = useRef<TextInput>(null);
  const confirmRef = useRef<TextInput>(null);

  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    clearErrors,
    formState: { isSubmitting, isValid },
  } = form;

  const onSubmit = async (values: ResetPasswordInput) => {
    setServerError(null);

    if (!token) {
      setServerError('Lien invalide ou expiré. Redemande un nouveau lien.');
      return;
    }

    const payload = resetPasswordSchema.parse(values);

    try {
      const { error } = await authClient.resetPassword({
        token,
        newPassword: payload.password,
      });

      if (error) {
        applyAuthError({ error, setServerError });
        return;
      }
    } catch (e) {
      setServerError(toNetworkErrorMessage(e));
      return;
    }

    router.replace('/sign-in');
  };

  return (
    <Form form={form}>
      <View className="gap-5">
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

            returnKeyType: 'next',
            blurOnSubmit: false,
            onSubmitEditing: () => confirmRef.current?.focus(),
          }}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          label="Confirmer :"
          placeholder="••••••••"
          secure
          withPasswordToggle
          inputRef={confirmRef}
          debounceClearErrorMs={250}
          onClearError={() => {
            clearErrors('confirmPassword');
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
          className="mt-2"
          size="lg"
          loading={isSubmitting}
          disabled={!isValid || isSubmitting}
          onPress={handleSubmit(onSubmit)}
        >
          Valider
        </Button>
      </View>
    </Form>
  );
};
