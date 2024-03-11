import useResponsiveDimensions from "./useResponsiveDimensions";
import {
  IResponsiveStyles,
  IResponsiveStylesIncomplete,
} from "$/types/IResponsiveStyles";
import { StyleSheet } from "react-native";
import NamedStyles = StyleSheet.NamedStyles;

const useResponsiveStyles = <
  T extends keyof NamedStyles<any>,
  V extends string,
>(
  responsiveStyles: IResponsiveStyles<V, T>,
): NamedStyles<Record<T, undefined>> => {
  const { viewport } = useResponsiveDimensions<V>();
  const chosenStyle = responsiveStyles[viewport];
  return StyleSheet.create<NamedStyles<Record<T, undefined>>>(
    chosenStyle ??
      (responsiveStyles as IResponsiveStylesIncomplete<V, T>).OTHER,
  );
};

export default useResponsiveStyles;
