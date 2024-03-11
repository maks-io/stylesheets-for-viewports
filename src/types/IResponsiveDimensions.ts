import { ScaledSize } from "react-native";

export interface IResponsiveDimensions<V> {
  dimensions: ScaledSize;
  viewport: V;
}
