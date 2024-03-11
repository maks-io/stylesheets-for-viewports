import { useCallback, useContext, useMemo } from "react";
import { ScaledSize, StyleSheet, useWindowDimensions } from "react-native";
import { IResponsiveDimensions } from "$/types/IResponsiveDimensions";
import ViewportContext from "$/context/ViewportContext";
import { IViewportConfig } from "$/types/IViewportConfig";
import NamedStyles = StyleSheet.NamedStyles;

const useResponsiveDimensions = <
  V extends keyof NamedStyles<any>,
>(): IResponsiveDimensions<V> => {
  const {
    viewports: viewportsProvided,
    getCurrentViewport: getCurrentViewportProvided,
  } = useContext(ViewportContext);
  const currentWindowDimensions = useWindowDimensions();

  const getCurrentViewportDefault = useCallback(
    (windowDimensions: ScaledSize, viewports: IViewportConfig<V>): V => {
      const { width } = windowDimensions;

      const viewportsDesc = [...viewports].reverse();
      for (let viewport of viewportsDesc) {
        const { lowestWidth } = viewport;
        if (!lowestWidth) {
          break;
        }
        if (width >= lowestWidth) {
          return viewport.name;
        }
      }
      return viewports[0].name;
    },
    [],
  );

  const getCurrentViewportEffective = useCallback(
    (): V =>
      getCurrentViewportProvided
        ? getCurrentViewportProvided(currentWindowDimensions, viewportsProvided)
        : getCurrentViewportDefault(currentWindowDimensions, viewportsProvided),
    [
      getCurrentViewportProvided,
      currentWindowDimensions,
      viewportsProvided,
      getCurrentViewportDefault,
    ],
  );

  return useMemo(
    () => ({
      dimensions: currentWindowDimensions,
      viewport: getCurrentViewportEffective(),
    }),
    [currentWindowDimensions, getCurrentViewportEffective],
  );
};

export default useResponsiveDimensions;
