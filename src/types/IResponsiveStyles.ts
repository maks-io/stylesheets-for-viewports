import { StyleSheet } from "react-native";
import NamedStyles = StyleSheet.NamedStyles;

export type IResponsiveStyles<
  V extends string,
  T extends keyof NamedStyles<any>,
> = IResponsiveStylesComplete<V, T> | IResponsiveStylesIncomplete<V, T>;

type IResponsiveStylesComplete<
  V extends string,
  T extends keyof NamedStyles<any>,
> = {
  [viewport in V]: NamedStyles<Record<T, undefined>>;
};

export type IResponsiveStylesIncomplete<
  V extends string,
  T extends keyof NamedStyles<any>,
> = {
  [viewport in V]?: NamedStyles<Record<T, undefined>>;
} & { OTHER: NamedStyles<Record<T, undefined>> };
