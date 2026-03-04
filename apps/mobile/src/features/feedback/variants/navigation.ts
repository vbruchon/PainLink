import { router } from 'expo-router';

export const goSuccessScreen = (id: string) => {
  router.replace(`/(feedback)/success/${id}`);
};

export const goNetworkErrorScreen = (retryTo?: string) => {
  router.replace({
    pathname: '/(feedback)/error/network',
    params: retryTo ? { retryTo } : {},
  } as any);
};
