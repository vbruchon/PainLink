import React from 'react';
import { FormProvider, type FieldValues, type UseFormReturn } from 'react-hook-form';

type Props<T extends FieldValues> = {
  form: UseFormReturn<T>;
  children: React.ReactNode;
};

export const Form = <T extends FieldValues>({ form, children }: Props<T>) => {
  return <FormProvider {...form}>{children}</FormProvider>;
};
