# emotion-to-vanilla-extract

Convert an Emotion CSSObject to a vanilla-extract ComplexStyleRule

## Usage

```ts
import emotionToVanillaExtract from "emotion-to-vanilla-extract";

emotionToVanillaExtract({
  borderRight: "none",
  borderTop: "none",
  border: "1px solid red",
  borderLeft: "none",
  borderBottom: "none",
  "&:hover": {
    border: "2px solid red",
    "&:not(:active)": {
      border: "2px solid aquamarine",
      "[data-mode='dark'] &": {
        border: "2px solid white",
      },
    },
  },
})

```

```ts
// returns
{
  "borderRight": "none",
  "borderTop": "none",
  "border": "1px solid red",
  "borderLeft": "none",
  "borderBottom": "none",
  "selectors": {
    "&:hover": {
      "border": "2px solid red",
    },
    "&:not(:active):hover": {
      "border": "2px solid aquamarine",
    },
    "[data-mode='dark'] &:not(:active):hover": {
      "border": "2px solid white",
    },
  },
}
```
