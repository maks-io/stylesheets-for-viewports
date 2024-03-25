# stylesheets-for-viewports 📱🖥️

[![Version](https://img.shields.io/npm/v/stylesheets-for-viewports)](https://www.npmjs.com/package/stylesheets-for-viewports)

Lightweight <strong>react native</strong> library for using different stylesheets based on current viewport (width, scale, etc.).

## Demo

<img src="documentation/stylesheets-for-viewports-gif-01.gif" alt="demo-gif">

## Live Demos

Check out the [Live Demo here](https://snack.expo.dev/@maks-io/stylesheets-for-viewports-demo) (Expo Snack).

## Installation

If you use expo, use:

```bash
expo install stylesheets-for-viewports
```

Otherwise, for npm use:

```bash
npm i stylesheets-for-viewports --save
```

And for yarn use:

```bash
yarn add stylesheets-for-viewports
```

## Usage

First, wrap your main app with the context provider, like so:

```tsx
import {
  ViewportContextProvider,
  IViewportConfig,
} from "stylesheets-for-viewports";

// define your viewports via typescript:
export type MyViewports = "MOBILE" | "TABLET" | "DESKTOP";

// define your viewport config:
const myViewportConfig: IViewportConfig<MyViewports> = [
  { name: "MOBILE", lowestWidth: undefined },
  { name: "TABLET", lowestWidth: 768 },
  { name: "DESKTOP", lowestWidth: 1280 },
];

export default function App() {
  return (
    <ViewportContextProvider<MyViewports> viewports={myViewportConfig}>
      <MyApp />
    </ViewportContextProvider>
  );
}
```

After that, you can use the responsive stylesheets, like so:

```tsx
import { Text, View } from "react-native";
import {
  IResponsiveStyles,
  useResponsiveStyles,
} from "stylesheets-for-viewports";
// also import MyViewports ;)

export const TestComponent = () => {
  const styles = useResponsiveStyles(responsiveStyles);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>TestComponent</Text>
    </View>
  );
};

const responsiveStyles: IResponsiveStyles<MyViewports, "container" | "text"> = {
  DESKTOP: {
    container: {
      backgroundColor: "blue",
    },
    text: { fontSize: 14 },
  },
  MOBILE: {
    container: { backgroundColor: "lightblue" },
    text: { fontSize: 10 },
  },
  // if you don't want to provide a style for every single viewport,
  // you can alternatively also provide an 'OTHER' entry, which kicks in...
  // for all other viewports:
  OTHER: { container: { backgroundColor: "grey" }, text: { fontSize: 8 } },
};
```

## Props

Besides the type parameter `V`, the `ViewportContextProvider` accepts 2 props:

| prop                 | required | type                                                                 | description                                                                                                                                                                                                                                                                                                         |
| -------------------- | -------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `viewports`          | yes      | `IViewportConfig<V>`                                                 | Define your viewports here, by providing the names and their lowest width value in pixels. Make sure the viewports are sorted in an ascending way, from lowest to highest width. The smallest viewport needs to have its `lowestWidth` set to `undefined`. Check the example above.                                 |
| `getCurrentViewport` | no       | `(windowDimensions: ScaledSize, viewports: IViewportConfig<V>) => V` | This optional prop provides a way of replacing the built-in function, that determines which viewport is the current one. While the built-in version only checks the current screen width, with the custom version you can add more complexity to the logic (like considering the `scale` factor for instance, etc.) |

## useResponsiveDimensions hook

The library also exports the internally used `useResponsiveDimensions` hook. Feel free to use it, it returns the following object:

```typescript
{
  dimensions: ScaledSize; // <-- the current width, scale, etc.
  viewport: V; // <-- the current viewport
}
```

## Misc

COMING SOON
