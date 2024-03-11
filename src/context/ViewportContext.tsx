import React, { createContext } from "react";
import { IViewportConfig } from "$/types/IViewportConfig";
import { ScaledSize } from "react-native";

type ViewportContextProps<V> = React.PropsWithChildren & {
  viewports: IViewportConfig<V>;
  getCurrentViewport?: (
    windowDimensions: ScaledSize,
    viewports: IViewportConfig<V>,
  ) => V;
};

export const ViewportContext = createContext<ViewportContextProps<any>>(
  {} as ViewportContextProps<any>,
);

export const ViewportContextProvider = <V extends string = "">({
  children,
  viewports,
}: ViewportContextProps<
  V extends ""
    ? "You must provide a list of viewports as a type parameter in the form of 'VIEWPORT_1' | 'VIEWPORT 2' | etc."
    : string
>) => {
  return (
    <ViewportContext.Provider value={{ viewports }}>
      {children}
    </ViewportContext.Provider>
  );
};

export default ViewportContext;
