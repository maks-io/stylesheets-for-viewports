import { ViewportContextProvider } from "./context/ViewportContext";
import useResponsiveDimensions from "./hooks/useResponsiveDimensions";
import useResponsiveStyles from "./hooks/useResponsiveStyles";
import { IResponsiveStyles } from "./types/IResponsiveStyles";
import { IViewportConfig } from "./types/IViewportConfig";

export {
  useResponsiveDimensions,
  useResponsiveStyles,
  ViewportContextProvider,
};
export type { IResponsiveStyles, IViewportConfig };
