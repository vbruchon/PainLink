import type { PropsWithChildren } from 'react';
import Svg from 'react-native-svg';

type Props = PropsWithChildren<{
  viewBox?: string;
}>;

export const BodySvgRoot = ({ viewBox = '0 0 592 1130', children }: Props) => {
  return (
    <Svg
      viewBox={viewBox}
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
    >
      {children}
    </Svg>
  );
};
